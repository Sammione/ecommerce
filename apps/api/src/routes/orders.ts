import { Router, Request, Response } from 'express';
import { prisma } from '@repo/database';

const router = Router();

// Create Order (Checkout)
router.post('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId, cartItems, shippingAddress, billingAddress, email, phone } = req.body;
    
    // In a real scenario, calculate total from DB prices, not frontend request
    let subtotal = 0;
    const orderItemsData = [];
    
    for (const item of cartItems) {
      const product = await prisma.product.findUnique({ where: { id: item.productId }});
      if (!product) continue;
      
      const itemPrice = Number(product.price);
      subtotal += itemPrice * item.quantity;
      
      orderItemsData.push({
        productId: product.id,
        variantId: item.variantId,
        quantity: item.quantity,
        priceAtPurchase: itemPrice
      });
    }

    const deliveryFee = 3000; // Mock delivery fee
    const totalAmount = subtotal + deliveryFee;

    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

    // Create the order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: userId || null,
        subtotal,
        deliveryFee,
        totalAmount,
        paymentStatus: 'PENDING',
        orderStatus: 'PENDING',
        items: {
          create: orderItemsData
        }
        // Shipping and billing addresses would be linked here
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// Get User Orders
router.get('/user/:userId', async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true, variant: true }
        },
        payments: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(orders);
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
