import Layout from '@/components/layout';
import GuestGuard from '@/utils/route-guards/guestGuard';
import { Box } from '@chakra-ui/react';

export default function Home() {
  return (
    <GuestGuard>
      <Layout>
        <Box height="100%">You are home!</Box>
      </Layout>
    </GuestGuard>
  );
}
