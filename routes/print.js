import { Router } from 'express';

import { ThermalPrinter, PrinterTypes } from 'node-thermal-printer';

const router = Router();

router.post('/print', async (req, res) => {
  const printer = new ThermalPrinter({
    interface: 'tcp://192.168.0.82',
    type: PrinterTypes.EPSON,
  });

  const { title } = req.body;

  try {
    await printer.print(title);
    await printer.cut();
    await printer.execute();
    res.send('Printed!');
  } catch (error) {
    res.status(500).send(`printer error : ${error.message}`);
  }

  res.status(500);
});

export default router;
