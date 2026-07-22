import { Request, Response } from "express";
import { verifyWebhook } from "@clerk/express/webhooks";
import { prisma } from "../configs/prisma";

const clerkWebhooks = async (req: Request, res: Response) => {
  try {
    const evt: any = await verifyWebhook(req);

    // Getting data from request
    const { data, type } = evt;

    // Switch cases for different events
    switch (type) {
      case "user.created": {
        await prisma.user.create({
          data: {
            id: data.id,
            email: data.email_addresses[0]?.email_address,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
          },
        });

        break;
      }

      default:
        break;
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};

export default clerkWebhooks; 