import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle, TabStopType, TabStopPosition } from "docx";
import { saveAs } from "file-saver";

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJnmChTT2x_6RtA9XHN_wsrxuhwjwj1FtQ5S7r9KpaSNhNYHXDybpUvLgLdKKBSBU2iQ/exec';

let bloggers = [];

async function loadBloggers() {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    bloggers = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки блогеров:', error);
  }
}
loadBloggers();

const executorInput = document.getElementById('executor');
const autocompleteList = document.getElementById('autocomplete-list');

executorInput.addEventListener('input', function() {
  const val = this.value;
  autocompleteList.innerHTML = '';
  if (!val) {
    autocompleteList.style.display = 'none';
    return;
  }
  
  let matchCount = 0;
  for (let i = 0; i < bloggers.length; i++) {
    const b = bloggers[i];
    if (b.executor.toLowerCase().includes(val.toLowerCase())) {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.innerHTML = `<strong>${b.executor}</strong> (${b.city})`;
      
      item.addEventListener('click', function() {
        executorInput.value = b.executor;
        document.getElementById('city').value = b.city || '';
        document.getElementById('unp').value = b.unp || '';
        document.getElementById('passport').value = b.passport || '';
        document.getElementById('address').value = b.address || '';
        document.getElementById('bank-account').value = b.bankAccount || '';
        document.getElementById('bank-name').value = b.bankName || '';
        document.getElementById('bank-code').value = b.bankCode || '';
        document.getElementById('instagram').value = b.instagram || '';
        
        autocompleteList.style.display = 'none';
      });
      autocompleteList.appendChild(item);
      matchCount++;
    }
  }
  autocompleteList.style.display = matchCount > 0 ? 'block' : 'none';
});

document.addEventListener('click', function(e) {
  if (e.target !== executorInput && e.target !== autocompleteList) {
    autocompleteList.style.display = 'none';
  }
});


document.getElementById('contract-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const contractNumber = document.getElementById('contract-number').value;
  const city = document.getElementById('city').value;
  const date = document.getElementById('date').value;
  const executor = document.getElementById('executor').value;
  const unp = document.getElementById('unp').value;
  const passport = document.getElementById('passport').value;
  const address = document.getElementById('address').value;
  const cost = document.getElementById('cost').value;
  const deadline = document.getElementById('deadline').value;
  const instagram = document.getElementById('instagram').value;
  const bankAccount = document.getElementById('bank-account').value;
  const bankName = document.getElementById('bank-name').value;
  const bankCode = document.getElementById('bank-code').value;

  const executorParts = executor.trim().split(/\s+/);
  let initials = executorParts[0];
  if (executorParts.length > 1) {
    initials += ' ' + executorParts[1][0] + '.';
    if (executorParts.length > 2) {
      initials += executorParts[2][0] + '.';
    }
  }

  const doc = new Document({
    creator: "Contract Generator",
    title: `Договор № ${contractNumber}`,
    styles: {
        default: {
            document: {
                run: {
                    font: "Times New Roman",
                    size: 28,
                },
                paragraph: {
                    alignment: AlignmentType.JUSTIFIED,
                }
            }
        }
    },
    sections: [
      {
        properties: {
            page: {
                margin: {
                    top: 1134, // 2 cm
                    right: 850, // 1.5 cm
                    bottom: 1134,
                    left: 1701, // 3 cm
                },
            },
        },
        children: [
          new Paragraph({
            children: [new TextRun({ text: `Договор № ${contractNumber}`, bold: true, size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "на выполнение работ", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          
          new Paragraph({
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            children: [
              new TextRun({ text: `г. ${city}`, size: 28 }),
              new TextRun("\t"),
              new TextRun({ text: `${date} г.`, size: 28 })
            ],
            spacing: { after: 400 }
          }),

          new Paragraph({
            children: [
              new TextRun({ text: `${executor}`, bold: true }),
              new TextRun(`, именуемая в дальнейшем «Исполнитель», `),
              new TextRun({ text: `УНП: ${unp}`, bold: true }),
              new TextRun(` действующий как самозанятая с уплатой налога на профессиональный доход, проживающий по адресу: `),
              new TextRun({ text: `${address}`, bold: true }),
              new TextRun(`, Паспорт: `),
              new TextRun({ text: `${passport}`, bold: true }),
              new TextRun(` с одной стороны, и `),
              new TextRun({ text: `Общество с ограниченной ответственностью «Бутик-Инвест»`, bold: true }),
              new TextRun(`, УНП 592024719 именуемое в дальнейшем «Заказчик», в лице начальника отдела маркетинга Каспер Ольги Юрьевны, действует на основании Доверенности от 01.10.2025 № 54, именуемое далее «Заказчик», заключили настоящий Договор о нижеследующем:`),
            ],
            spacing: { after: 400 },
            indent: { firstLine: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "1. Предмет договора", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          
          new Paragraph({
            children: [new TextRun({ text: "1.1. Заказчик поручает, а Исполнитель принимает на себя обязательства по выполнению следующих работ:", size: 28 })],
            spacing: { after: 120 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "- размещение рекламной информации о ООО «Бутик-Инвест», через сеть Интернет в аккаунте в социальной сети Instagram (Инстаграм)", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: `Ссылка на аккаунт ${instagram}`, size: 28 })],
            spacing: { after: 200 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: `1.2. Сроки оказания услуг – ${deadline}`, size: 28 })],
            spacing: { after: 200 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "1.3. Результаты оказанных услуг передаются Заказчику через сеть Интернет. Заказчик обязуется принять указанные услуги и оплатить их в сроки, указанные в Договоре.", size: 28 })],
            spacing: { after: 400 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "2. Обязанности сторон", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.1. Исполнитель обязуется:", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.1.1. Выполнять порученные ему задания наилучшим образом, соответственно в профессиональном и коммерческом отношениях.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 1080 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.1.2. Исполнитель гарантирует соблюдение конфиденциальности и принимает все возможные меры по сохранению и неразглашению сведений, составляющих коммерческую тайну и полученных в результате исполнения настоящего договора.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 1080 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.1.3. Исполнитель высылает подготовленный материал на согласование заказчику до публикации рекламных материалов.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 1080 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.1.4. Исполнитель гарантирует, что на момент оказания услуг по настоящему Договору он включен в РЕЕСТР рекламораспространителей и вправе оказывать Услуги по размещению (распространению) рекламы.", size: 28 })],
            spacing: { after: 200 },
            indent: { left: 1080 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.2. Заказчик обязуется:", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.2.1. Предоставить информацию, необходимую для выполнения работ Исполнителем;", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 1080 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.2.2. Утвердить результаты работ в течение 5 рабочих дней с момента предоставления их Исполнителем. В случае мотивированного отказа от утверждения, сторонами составляется акт с перечнем доработок и сроком их выполнения;", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 1080 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "2.2.3. Своевременно оплатить работу Исполнителя.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 1080 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "3. Стоимость работ и порядок расчетов", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "3.1. Общая стоимость работ по настоящему Договору составляет: ", size: 28 }),
              new TextRun({ text: `${cost} белорусских рублей 00 копеек. Без НДС.`, bold: true, size: 28 })
            ],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "3.2. Оплата производится в течение 7-и банковских дней после подписания настоящего Договора.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "4. Порядок сдачи-приемки работ", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "4.1. Приемка работ по договору осуществляется путем подписания сторонами акта сдачи-приемки работ. Датой акта приема-передачи считается дата подписания акта Заказчиком. До обмена оригиналами стороны признают юридическую силу подписанных документов по факсимильной связи.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "5. Передача Авторских прав", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "5.1. Объекты – все результаты деятельности Исполнителя по настоящему договору, выраженные в любой форме, включая, но не ограничиваясь этим, все документы, проекты, тексты, рисунки, дизайны, фотографии, базы данных являющиеся объектами авторского права, указанные в Приложениях к настоящему договору и/или в актах сдачи – приемки работ.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "5.2. Исполнитель обязуется передать в собственность Заказчику все исключительные имущественные авторские права на разработанную продукцию согласно п. 1.1. настоящего Договора.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "5.3. Вознаграждение за уступку авторских прав входит в стоимость работ Исполнителя, оговоренных в настоящем Договоре.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "5.4. Авторские права считаются переданными в момент подписания акта сдачи – приемки работ.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "5.5. Исполнитель гарантирует Заказчику, что все Объекты, Права на которые Исполнитель передает Заказчику, не являются предметом авторских прав третьих лиц, и Исполнитель имеет все права для осуществления такой передачи.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "6. Ответственность сторон", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "6.1. В случае невыполнения Заказчиком своих договорных обязательств по оплате, работы по настоящему договору могут быть приостановлены до момента оплаты.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "6.2. При задержке сроков оплаты Заказчиком, оговоренных в настоящем Договоре, Исполнитель имеет право потребовать от Заказчика уплаты пени в размере 0,1% от неоплаченной в срок суммы за каждый день просрочки.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "6.3. При задержке сроков сдачи работ по вине Исполнителя, последний оплачивает Заказчику пеню в размере 0,1% от суммы оплаченной Заказчиком за каждый день просрочки.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "6.4. При расторжении договора по инициативе Заказчика, последний оплачивает стоимость выполненных работ на момент расторжения договора.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "6.5. При возникновении споров по настоящему договору стороны примут все меры к их разрешению путем переговоров. При не достижении договоренности, споры рассматриваются в установленном законодательством Республики Беларусь порядке.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "7. Форс-мажорные обстоятельства.", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "7.1. Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств по настоящему договору, если неисполнение явилось следствием обстоятельств непреодолимой силы, возникших после заключения договора. К обстоятельствам непреодолимой силы относятся события, на которые сторона не может оказать влияние и за возникновение которых не несет ответственности (например: наводнение, пожары, иные стихийные бедствия). К обстоятельствам, освобождающим сторону от ответственности, относятся также забастовки, правительственные постановления или распоряжения государственных органов, если указанные обстоятельства имеют непосредственное влияние на возможность исполнения сторонами обязательств по договору.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "7.2. Сторона, ссылающаяся на такие обстоятельства, обязана в 3-дневный срок в письменной форме информировать другую сторону о наступлении подобных обстоятельств. Если сторона не направит или несвоевременно направит необходимые извещения, то она обязана возместить другой стороне причиненные этим убытки.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "7.3. Если обстоятельства непреодолимый силы продолжают действовать более 12 месяцев, то каждая из сторон имеет право расторгнуть настоящий договор.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "8. Срок действия договора.", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "8.1. Настоящий договор вступает в силу с момента подписания и действует до исполнения сторонами своих обязательств.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "8.2. Досрочное расторжение договора может иметь место по согласованию сторон, оформленному в письменном виде.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "8.3. Договор может быть расторгнут в одностороннем порядке спустя месяц после письменного извещения заинтересованной стороны, но не ранее окончания всех обязательств по Договору.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "9. Дополнительные условия.", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "9.1. Исполнитель вправе привлечь к выполнению отдельных видов работ третьи организации.", size: 28 })],
            spacing: { after: 120 },
            indent: { left: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "9.2. Исполнитель отвечает перед Заказчиком за неисполнение/не должное исполнение работ третьими лицами.", size: 28 })],
            spacing: { after: 400 },
            indent: { left: 720 }
          }),

          new Paragraph({
            children: [new TextRun({ text: "10. Юридические адреса и реквизиты сторон", size: 28 })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 200 }
          }),
          
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Исполнитель:", underline: { type: "single" }, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `${executor}`, bold: true, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `УНП ${unp}`, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `Адрес: ${address}`, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `Паспорт: ${passport}`, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `Р/С ${bankAccount}`, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `в ${bankName}`, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: `код ${bankCode}`, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: `_________________ / ${initials} /` })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Заказчик:", underline: { type: "single" }, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Общество с ограниченной Ответственностью", bold: true, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "«Бутик-Инвест»", bold: true, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "УНП 592024719", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "231337, Гродненская обл.,", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Ивьевский район, г. Ивье, ул.", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Энгельса, 1, пом. 1", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Р/С BY69BAPB30129796500500000000", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "В ОАО «Белагропромбанк», код банка BAPBBY2X", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: "___________________ Каспер О.Ю." })] }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            children: [new TextRun({ text: "Акт сдачи-приемки оказанных услуг", bold: true, size: 24 })],
            alignment: AlignmentType.CENTER,
            pageBreakBefore: true,
            spacing: { before: 200 }
          }),
          new Paragraph({
            children: [new TextRun({ text: `к договору возмездного оказания услуг №${contractNumber} от ${date} г.`, size: 24 })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
          }),
          
          new Paragraph({
            tabStops: [
                {
                    type: TabStopType.RIGHT,
                    position: TabStopPosition.MAX,
                },
            ],
            children: [
              new TextRun({ text: `${date} г.`, size: 24 }),
              new TextRun("\t"),
              new TextRun({ text: `г. ${city}`, size: 24 })
            ],
            spacing: { after: 400 }
          }),
          
          new Paragraph({
            children: [
              new TextRun({ text: `${executor}`, bold: true, size: 24 }),
              new TextRun({ text: `, именуемая в дальнейшем «Исполнитель», УНП: `, size: 24 }),
              new TextRun({ text: `${unp}`, bold: true, size: 24 }),
              new TextRun({ text: ` действующий как самозанятая с уплатой налога на профессиональный доход, проживающий по адресу: `, size: 24 }),
              new TextRun({ text: `${address}`, bold: true, size: 24 }),
              new TextRun({ text: ` с одной стороны, и Общество с ограниченной ответственностью «Бутик-Инвест», УНП 592024719 именуемое в дальнейшем «Заказчик», в лице начальника отдела маркетинга Каспер Ольги Юрьевны, действует на основании Доверенности от 01.10.2025 № 54, именуемое далее «Заказчик», составили настоящий акт о нижеследующем:`, size: 24 }),
            ],
            spacing: { after: 400 },
            indent: { firstLine: 720 }
          }),
          
          new Paragraph({
            children: [new TextRun({ text: `Исполнитель оказал услуги размещение рекламной информации о ООО «Бутик-Инвест», через сеть Интернет в аккаунте в социальной сети Instagram (Инстаграм) ссылка ${instagram}`, size: 24 })],
            spacing: { after: 200 },
            indent: { firstLine: 720 }
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Стоимость оказанных услуг составила `, size: 24 }),
              new TextRun({ text: `${cost} белорусских рублей 00 копеек.`, bold: true, size: 24 })
            ],
            spacing: { after: 200 },
            indent: { firstLine: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "Услуги оказаны надлежащим образом в соответствии с условиями договора и подлежат оплате в полном объеме.", size: 24 })],
            spacing: { after: 200 },
            indent: { firstLine: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "Стороны не имеют претензий к качеству оказанных услуг.", size: 24 })],
            spacing: { after: 200 },
            indent: { firstLine: 720 }
          }),
          new Paragraph({
            children: [new TextRun({ text: "Настоящий акт сдачи-приемки оказанных услуг является основанием для расчетов и оплаты Исполнителю вознаграждения.", size: 24 })],
            spacing: { after: 400 },
            indent: { firstLine: 720 }
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Исполнитель:", underline: { type: "single" }, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: `_________________ / ${initials} /` })] }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    children: [
                      new Paragraph({ children: [new TextRun({ text: "Заказчик:", underline: { type: "single" }, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Общество с ограниченной Ответственностью", bold: true, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "«Бутик-Инвест»", bold: true, size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "УНП 592024719", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "231337, Гродненская обл.,", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Ивьевский район, г. Ивье, ул.", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Энгельса, 1, пом. 1", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "Р/С BY69BAPB30129796500500000000", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: "В ОАО «Белагропромбанк», код банка BAPBBY2X", size: 24 })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: " " })] }),
                      new Paragraph({ children: [new TextRun({ text: "___________________ Каспер О.Ю." })] }),
                    ],
                  }),
                ],
              }),
            ],
          })
        ]
      }
    ]
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `Договор_№${contractNumber.replace(/\//g, '_')}_${executor}.docx`);
    
    // Сохраняем в Google Таблицу
    saveBloggerToSheets({
      executor, city, unp, passport, address, bankAccount, bankName, bankCode, instagram
    });
  });
});

function saveBloggerToSheets(data) {
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(res => {
    if (res.status === 'success') {
      bloggers.push(data); // обновляем локально чтобы сразу было доступно в поиске
    }
  })
  .catch(err => console.error('Ошибка сохранения:', err));
}

