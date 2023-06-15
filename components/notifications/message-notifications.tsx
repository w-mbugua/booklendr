import {
  ConversationsDocument,
  UpdatedConversationDocument
} from '@/generated/gql/graphql';
import { useQuery } from '@apollo/client';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Progress,
  Flex,
  Divider,
  Text
} from '@chakra-ui/react';
import { toast } from 'react-hot-toast';
import NotificationItem from './notificationItem';
import useAuth from '@/hooks/useAuth';
import { ModalProps } from '../modal';
import { Fragment } from 'react';

export default function MessageNotifications({ onClose, isOpen }: ModalProps) {
  const { currentUser } = useAuth();
  const { data, loading, error, subscribeToMore } = useQuery(
    ConversationsDocument,
    {
      onError: (error) => {
        toast.error(error.message);
      }
    }
  );

  return (
    <Drawer placement="right" size="sm" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Messages</DrawerHeader>
        {loading && <Progress size="xs" isIndeterminate />}
        {data?.conversations.length ? (
          <DrawerBody overflow="hidden" justifyContent="center">
            <Flex direction="column" gap="10px" alignItems="center">
              {currentUser &&
                data.conversations.map((conversation, idx) => (
                  <Fragment key={conversation.id}>
                    <NotificationItem
                      conversation={conversation}
                      userId={currentUser.id || null}
                      // subScribeToCornversation={() => {}}
                      subScribeToCornversation={() =>
                        subscribeToMore({
                          document: UpdatedConversationDocument,
                          variables: { conversationId: conversation.id },
                          updateQuery: (prev, { subscriptionData }) => {
                            if (!subscriptionData) return prev;

                            const existingConversation =
                              prev.conversations.find(
                                (convo) =>
                                  convo.id ===
                                  subscriptionData.data.updatedConversation.id
                              );
                            const newConversation = {
                              ...existingConversation,
                              latestMessage:
                                subscriptionData.data.updatedConversation
                                  .latestMessage
                            };
                            return Object.assign({}, prev, {
                              conversations:
                                currentUser.id ===
                                newConversation.latestMessage?.sender.id
                                  ? prev.conversations
                                  : [newConversation, ...prev.conversations]
                            });
                          }
                        })
                      }
                    />
                    <Divider />
                  </Fragment>
                ))}
            </Flex>
          </DrawerBody>
        ) : (
          <Text align="center" py={4}>
            No messages
          </Text>
        )}
      </DrawerContent>
    </Drawer>
  );
}
