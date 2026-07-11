import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel } from "docx";
import fs from "fs";

try {
  const doc = new Document({
    creator: "Contract Generator",
    title: `Договор`,
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: `Договор`,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          })
        ]
      }
    ]
  });

  Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("test.docx", buffer);
    console.log("Success");
  }).catch(err => {
    console.error("Packer error:", err);
  });
} catch (e) {
  console.error("Doc error:", e);
}
