import { Router, Request, Response } from 'express';
import { prisma } from '@repo/database';

const router = Router();
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_fake_key';

// Initialize Payment
router.post('/initialize', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, amount, orderId } = req.body;
    
    // In a real implementation, we would make a server-to-server call to Paystack here
    // using axios or fetch to https://api.paystack.co/transaction/initialize
    
    // Mock Paystack response for demonstration
    const mockPaystackResponse = {
      status: true,
      message: "Authorization URL created",
      data: {
        authorization_url: "https://checkout.paystack.com/fake_url",
        access_code: "fake_access_code",
        reference: `mock_ref_${Date.now()}`
      }
    };
    
    // Save payment intent to database
    if (orderId) {
      await prisma.payment.create({
        data: {
          orderId,
          reference: mockPaystackResponse.data.reference,
          amount,
          provider: 'PAYSTACK',
          status: 'PENDING'
        }
      });
    }

    res.json(mockPaystackResponse);
  } catch (error) {
    console.error('Payment initialization failed:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// Paystack Webhook
router.post('/webhook', async (req: Request, res: Response): Promise<any> => {
  // Validate Paystack signature here using crypto
  const event = req.body;
  
  if (event.event === 'charge.success') {
    const reference = event.data.reference;
    
    try {
      const payment = await prisma.payment.findUnique({ where: { reference } });
      
      if (payment && payment.status !== 'SUCCESS') {
        // Update payment status
        await prisma.payment.update({
          where: { reference },
          data: { status: 'SUCCESS', metadata: event.data }
        });
        
        // Update order status
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { 
            paymentStatus: 'SUCCESS',
            orderStatus: 'CONFIRMED'
          }
        });
      }
    } catch (error) {
       console.error('Webhook processing failed:', error);
    }
  }
  
  res.sendStatus(200); // Always return 200 OK to Paystack
});

export default router;
