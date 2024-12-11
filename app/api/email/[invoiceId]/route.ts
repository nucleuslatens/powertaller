import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { checkPrimeSync } from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request, {params}: {params: Promise<{invoiceId: string}>}) {
  try {
      const session = await requireUser()
  
      const { invoiceId } = await params
  
      const invoiceData = await prisma.invoice.findUnique({
          where: {
              id: invoiceId,
              userId: session.user?.id
          }
      })
  
      if (!invoiceData) {
          return NextResponse.json({error: 'Invoice not found'}, {status: 404})
      }
  
      const sender = {
          email: "hello@demomailtrap.com",
          name: "Mailtrap Test",
        };
  
      emailClient.send({
          from: sender,
          to: [{email: 'joseperez14583@gmail.com'}],
          template_uuid: "ec3578ab-e0d3-4993-a07c-e16a8fea1d80",
          template_variables: {
            "first_name": invoiceData.clientName,
            "company_info_name": "Powertech",
            "company_info_address": "18 de Julio 367",
            "company_info_city": "Durazno",
            "company_info_zip_code": "97000",
            "company_info_country": "Uruguay"
          }
      })
  
      return NextResponse.json({success: true})
  } catch (error) {
        return NextResponse.json({error: 'Failed to sned email reminder'}, {status: 500})
  }

}
