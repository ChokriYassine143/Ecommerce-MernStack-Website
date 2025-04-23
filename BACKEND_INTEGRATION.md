
# Backend Integration Guide with NestJS

This guide provides step-by-step instructions for integrating your NestJS backend with the EcoShop frontend application.

## Prerequisites

- Node.js and npm installed
- NestJS CLI installed (`npm i -g @nestjs/cli`)
- PostgreSQL database
- JWT for authentication

## Setup Steps

### 1. Create NestJS Project

```bash
nest new ecoshop-backend
cd ecoshop-backend
```

### 2. Install Required Dependencies

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt @nestjs/typeorm typeorm pg bcrypt class-validator class-transformer @nestjs/config
```

### 3. Database Configuration

Create `.env` file in your NestJS project root:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_NAME=ecoshop
JWT_SECRET=your_jwt_secret
```

### 4. Authentication Implementation

#### 4.1 User Entity (src/users/entities/user.entity.ts)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
```

#### 4.2 Authentication Controller (src/auth/auth.controller.ts)

Implement these endpoints:

1. POST /auth/register - User registration
2. POST /auth/login - User login
3. POST /auth/forgot-password - Password reset request
4. POST /auth/reset-password - Password reset
5. GET /auth/profile - Get user profile
6. PUT /auth/profile - Update user profile

### 5. Orders Management

#### 5.1 Order Entity (src/orders/entities/order.entity.ts)

```typescript
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

  @Column('jsonb')
  items: any[];

  @Column('decimal')
  total: number;

  @Column()
  shippingAddress: string;
}
```

### 6. Admin Functionality

Implement admin guards and endpoints for:

1. Managing products
2. Managing orders
3. Managing users
4. Managing deals and discounts
5. Managing new arrivals

### 7. Frontend Integration

Update these files in your frontend project:

1. Create API service (src/services/api.ts)
2. Update AuthContext to use the API
3. Update order tracking to use real API
4. Add admin management features

## API Endpoints

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET /api/auth/profile
PUT /api/auth/profile
```

### Orders

```
GET /api/orders
POST /api/orders
GET /api/orders/:id
PUT /api/orders/:id/status (admin only)
```

### Products

```
GET /api/products
POST /api/products (admin only)
PUT /api/products/:id (admin only)
DELETE /api/products/:id (admin only)
```

### Deals & New Arrivals

```
GET /api/deals
POST /api/deals (admin only)
PUT /api/deals/:id (admin only)
DELETE /api/deals/:id (admin only)

GET /api/new-arrivals
POST /api/new-arrivals (admin only)
PUT /api/new-arrivals/:id (admin only)
DELETE /api/new-arrivals/:id (admin only)
```

## Security Considerations

1. Implement rate limiting
2. Use CORS properly
3. Validate all inputs
4. Implement proper error handling
5. Use environment variables for sensitive data
6. Implement proper logging

## Testing

1. Create unit tests for all services
2. Create e2e tests for API endpoints
3. Test authentication flow
4. Test admin functionalities
5. Test order management

## Deployment

1. Set up CI/CD pipeline
2. Configure production environment
3. Set up monitoring and logging
4. Configure backup strategy
5. Set up SSL certificates

## Common Issues and Solutions

1. CORS issues: Ensure proper CORS configuration in NestJS
2. Authentication errors: Check JWT configuration
3. Database connection: Verify database credentials and connection
4. File uploads: Configure proper storage solution
5. Performance: Implement caching where necessary

