import { Router, Request, Response } from 'express';
import { prisma } from '@repo/database';

const router = Router();

// Get all products (with optional filtering)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    
    let whereClause: any = {
      status: 'PUBLISHED'
    };

    if (category) {
      whereClause.category = {
        slug: String(category)
      };
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } }
      ];
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        images: true,
        category: true,
        variants: true
      }
    });

    res.json(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        category: true,
        variants: true,
        reviews: {
          where: { status: 'APPROVED' }
        }
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

export default router;
