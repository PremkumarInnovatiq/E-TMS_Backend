const express = require('express');
const router = express.Router();
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const os = require('os');

function generateRandomId() {
  // Generate 7 random numbers
  const numbers = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
  // Generate 5 random letters
  const letters = Array.from({ length: 5 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 65));

  // Shuffle the numbers and letters randomly
  const randomChars = shuffle([...numbers, ...letters]);

  // Join the shuffled characters into a single string
  return randomChars.join('');
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

router.post('/generate', async (req, res, next) => {
  try {
    const { name, course } = req.body;

    const filePath = path.join(__dirname, 'tms-new-certificate.pdf');
    const existingPdfBytes = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    

    firstPage.drawText(name, {
      x: 460,
      y: 400,
      size: 44,
    });

   firstPage.drawText(course, {
      x: 580,
      y: 305,
      size: 30,
    });

    const randomId = generateRandomId();
    const idNumbers = randomId.slice(0, 7);
    const idLetters = randomId.slice(7, 12);
    const shuffledId = shuffle([...idNumbers, ...idLetters]).join('');

    firstPage.drawText(shuffledId, {
      x: 900,
      y: 668,
      size: 16,
    });

    const tmpDir = os.tmpdir();
    const tmpFilePath = path.join(tmpDir, 'tms-new-certificate.pdf');
    const tmpFile = await fs.promises.open(tmpFilePath, 'w');
    const pdfBytes = await pdfDoc.save();
    await tmpFile.write(pdfBytes);
    await tmpFile.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename= tms-new-certificate.pdf');
    res.setHeader('Content-Length', pdfBytes.length);

    res.sendFile(tmpFilePath);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;


