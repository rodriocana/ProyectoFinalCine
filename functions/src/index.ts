/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });



const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Función que se ejecuta cuando se añade un nuevo producto a Firestore
exports.notifyOnNewProduct = functions.firestore
  .document("Producto/{productId}")
  .onCreate(async (snapshot: { data: () => any; }, context: any) => {
    const newProduct = snapshot.data();

    // Construir el mensaje de notificación
    const payload = {
      notification: {
        title: "¡Nuevo Producto Añadido!",
        body: `Se ha añadido "${newProduct.nombreProducto}" a la tienda.`,
        click_action: "FLUTTER_NOTIFICATION_CLICK", // Reemplaza según tu plataforma web/app
      },
    };

    // Obtener los tokens FCM de los usuarios
    const tokensSnapshot = await admin.firestore().collection("Usuarios").get();
    const tokens = tokensSnapshot.docs
      .map((doc: { data: () => { (): any; new(): any; fcmToken: any; }; }) => doc.data().fcmToken)
      .filter((token: any) => token);

    if (tokens.length > 0) {
      try {
        // Enviar notificación a todos los tokens
        await admin.messaging().sendToDevice(tokens, payload);
        console.log("Notificación enviada a:", tokens);
      } catch (error) {
        console.error("Error enviando notificación:", error);
      }
    } else {
      console.log("No hay tokens de FCM registrados.");
    }
  });
