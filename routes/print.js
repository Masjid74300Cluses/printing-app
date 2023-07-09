import { Router } from 'express';

import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';
import * as CONSTANTS from '../constants/constants.js';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/print', async (req, res) => {
  const printer = new ThermalPrinter({
    interface: CONSTANTS.TCP_INTERFACE,
    type: PrinterTypes.EPSON,
  });

  const { title, stands } = req.body;

  // num commande;
  // nom
  // email
  // stand

  

  sendEmail();
  try {
    /*const products = [
      { name: 'Produit 1', price: 100, quantity: 2 },
      { name: 'Produit 2', price: 150, quantity: 1 },
      { name: 'Produit 3', price: 80, quantity: 3 }
    ];*/
  
     // Configuration des options d'impression
     printer.alignCenter();
     printer.setTextDoubleHeight();
     printer.println('ORDER-APP');
     printer.setTextNormal();
     printer.println('-------------------------');
   
     // Affichage de la liste des produits
     printer.alignLeft();
     printer.tableCustom([
       { text: 'Produit', align: 'LEFT', width: 0.5 },
       { text: 'Prix', align: 'RIGHT', width: 0.25 },
       { text: 'Qté', align: 'RIGHT', width: 0.25 }
     ]);
   
     printer.tableCustom([
       { text: '-------------------------', align: 'LEFT', width: 0.75 },
       { text: '------', align: 'RIGHT', width: 0.25 }
     ]);
   
     let total = 0;
   
     for (const stand of stands) {
      const products  = stand.productsList;
      for (const product of products) {
        const { name, price, quantity } = product;
        const subtotal = (price / 100) * quantity;
        total += subtotal;
    
        printer.tableCustom([
          { text: name, align: 'LEFT', width: 0.5 },
          { text: `${price.toFixed(2)}€`, align: 'RIGHT', width: 0.25 },
          { text: quantity.toString(), align: 'RIGHT', width: 0.25 }
        ]);
    
        printer.tableCustom([
          { text: '', align: 'LEFT', width: 0.5 },
          { text: '', align: 'RIGHT', width: 0.25 },
          { text: `${subtotal.toFixed(2)}€`, align: 'RIGHT', width: 0.25 }
        ]);
      }
    }
     
     printer.alignRight();
     printer.println('-------------------------');
     printer.tableCustom([
       { text: 'Sous-total:', align: 'LEFT', width: 0.75 },
       { text: `${total.toFixed(2)}€`, align: 'RIGHT', width: 0.25 }
     ]);
   
     const tva = total * 0.2; // Exemple de TVA à 20%
     const ttc = total + tva;
   
     printer.tableCustom([
       { text: 'TVA (20%):', align: 'LEFT', width: 0.75 },
       { text: `${tva.toFixed(2)}€`, align: 'RIGHT', width: 0.25 }
     ]);
   
     printer.tableCustom([
       { text: 'Total TTC:', align: 'LEFT', width: 0.75 },
       { text: `${ttc.toFixed(2)}€`, align: 'RIGHT', width: 0.25 }
     ]);
    printer.cut();

    // Connexion à l'imprimante et impression du ticket
    await printer.execute().then(() => {
      console.log('Impression terminée');
    }).catch((err) => {
      console.error(err);
    });

    res.send('Printed!');
  } catch (error) {
    res.status(204).send('problème envoie impression ')
    // res.status(500).send(`printer error : ${error.message}`);
  }

  res.status(500);
});

function sendEmail() {

//


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: CONSTANTS.MAIN_EMAIL,
            pass: CONSTANTS.MAIN_PASS
        }
    });

    const mailOptions = {
        from: 'clusesmosquee@gmail.com',
        to: 'mkanoute74@gmail.com',
        subject: 'Récapitulatif de votre commande',
        html: '<!DOCTYPE html>' +
            '<html lang="fr">' +
            '<head>' +
            '  <meta charset="UTF-8">' +
            '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
            '  <title>Récapitulatif de commande</title>' +
            '  <style>' +
            '    /* Styles personnalisés pour l\'email */' +
            '    body {' +
            '      font-family: Arial, sans-serif;' +
            '      margin: 0;' +
            '      padding: 20px;' +
            '    }' +
            '' +
            '    h1 {' +
            '      color: #333;' +
            '    }' +
            '' +
            '    table {' +
            '      width: 100%;' +
            '      border-collapse: collapse;' +
            '      margin-top: 20px;' +
            '    }' +
            '' +
            '    th, td {' +
            '      padding: 10px;' +
            '      text-align: left;' +
            '      border-bottom: 1px solid #ddd;' +
            '    }' +
            '' +
            '    th {' +
            '      background-color: #f5f5f5;' +
            '    }' +
            '  </style>' +
            '</head>' +
            '<body>' +
            '  <h1>Récapitulatif de commande</h1>' +
            '' +
            '  <table>' +
            '    <thead>' +
            '      <tr>' +
            '        <th>Produit</th>' +
            '        <th>Prix</th>' +
            '        <th>Quantité</th>' +
            '        <th>Total</th>' +
            '      </tr>' +
            '    </thead>' +
            '    <tbody>' +
            '      <!-- Ajoutez ici les détails de la commande avec une boucle ou des données dynamiques -->' +
            '      <tr>' +
            '        <td>Nom du produit 1</td>' +
            '        <td>10,00 €</td>' +
            '        <td>2</td>' +
            '        <td>20,00 €</td>' +
            '      </tr>' +
            '      <tr>' +
            '        <td>Nom du produit 2</td>' +
            '        <td>15,00 €</td>' +
            '        <td>1</td>' +
            '        <td>15,00 €</td>' +
            '      </tr>' +
            '      <tr>' +
            '        <td colspan="3"><strong>Total de la commande</strong></td>' +
            '        <td><strong>35,00 €</strong></td>' +
            '      </tr>' +
            '    </tbody>' +
            '  </table>' +
            '' +
            '  <p>Merci d\'avoir passé commande chez nous. Veuillez trouver ci-joint le récapitulatif de votre commande.</p>' +
            '' +
            '  <p>Cordialement,<br>L\'Association Espoir vous remercie très chaleureusement</p>' +
            '</body>' +
            '</html>'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}

export default router;
