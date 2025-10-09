import { Box, Card, CardContent } from '@mui/material';
import { ReactNode } from 'react';

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  return (
    <Box display="flex" justifyContent="center" mt={8} p={2}>
      <Card
        sx={{
          width: '100%',
          maxWidth: { xs: 320, sm: 400 },
          boxShadow: 6,
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>{children}</CardContent>
      </Card>
    </Box>
  );
}
