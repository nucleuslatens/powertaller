import { z } from 'zod'

export const onboardingSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    address: z.string().min(2, 'Address is required')
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, 'Invoice name is required'),
    total: z.number().min(1, 'Amount is required'),
    status: z.enum(['PAID', 'PENDING']).default('PENDING'),
    date: z.string().min(1, 'Date is required'),
    dueDate: z.number().min(0, 'Due date is required'),
    fromName: z.string().min(1, 'From name is required'),
    fromEmail: z.string().email('Invalid email'),
    fromAddress: z.string().min(1, 'From address is required'),
    clientName: z.string().min(1, 'Client name is required'),
    clientEmail: z.string().email('Invalid email'),
    clientAddress: z.string().min(1, 'Client address is required'),
    currency: z.string().min(1, 'Currency is required'),
    invoiceNumber: z.number().min(1, 'Invoice number is required'),
    note: z.string().optional(),
    invoiceItemDescription: z.string().min(1, 'Description is required'),
    invoiceItemQuantity: z.number().min(1, 'Quantity is required'),
    invoiceItemRate: z.number().min(1, 'Rate is required'),
})