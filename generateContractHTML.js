export function generateContractHTML({ contractNumber, date, executor, unp, passport, address, cost, startDate, endDate, actDate, bankAccount, bankName, bankCode }) {
  const initials = executor.split(' ').map((n, i) => i === 0 ? n : n[0] + '.').join(' ');

  return `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 16px; line-height: 1.5; color: black; max-width: 800px; margin: 0 auto; padding: 40px;">
      <h2 style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px;">Договор № ${contractNumber}</h2>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
        <span>Место заключения: г.Минск</span>
        <span>Дата заключения: ${date} г.</span>
      </div>

      <p style="text-align: justify; margin-bottom: 20px; text-indent: 40px;">
        <b>${executor}</b>, именуемый в дальнейшем «Исполнитель», УНП: <b>${unp}</b> действующий как самозанятый с уплатой налога на профессиональный доход, проживающий по адресу: <b>${address}</b> с одной стороны, и <b>ООО «Бутик-Инвест»</b>, именуемое в дальнейшем «Заказчик», в лице начальника отдела маркетинга Каспер Ольги Юрьевны, действующего на основании Доверенности от 01.10.2025 № 54, с другой стороны, а вместе именуемые «Стороны», заключили настоящий Договор о нижеследующем:
      </p>

      <p style="text-indent: 40px; margin-bottom: 10px;"><b>1. ПРЕДМЕТ ДОГОВОРА</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">1.1. Исполнитель обязуется оказать Заказчику комплекс маркетинговых и рекламных услуг и услуг по съемке и монтажу видео-материалов, а Заказчик обязуется принять и оплатить оказанные услуги.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">1.2. Сроки оказания услуг: в период с ${startDate} до ${endDate}</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>2. ПРАВА И ОБЯЗАННОСТИ СТОРОН</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.1. Исполнитель обязан:</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.1.1. Оказать услуги надлежащего качества и в сроки, предусмотренные в пункте 1.2. настоящего Договора.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.1.2. Оказать услуги лично.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.1.3. Приступить к оказанию услуг по настоящему Договору с момента его подписания.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.2. Заказчик обязан:</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.2.1. Предоставить Исполнителю информацию, необходимую для оказания услуг.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.2.2. Оплатить услуги Исполнителя в размере и сроки, предусмотренные настоящим Договором.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2.3. Заказчик имеет право осуществлять контроль и надзор за ходом и качеством оказываемых услуг, не вмешиваясь в деятельность Исполнителя.</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>3. ПОРЯДОК СДАЧИ-ПРИЕМКИ ОКАЗАННЫХ УСЛУГ</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">3.1. Сдача-приемка оказанных услуг оформляется Сторонами Актом оказанных услуг.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">3.2. Акт оказанных услуг составляется Исполнителем и направляется Заказчику.</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>4. СТОИМОСТЬ УСЛУГ И ПОРЯДОК РАСЧЕТОВ</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">4.1. Стоимость услуг составляет ${cost} белорусских рублей.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">4.2. Оплата производится путем перечисления Заказчиком денежных средств на расчетный счет Исполнителя.</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>5. ОТВЕТСТВЕННОСТЬ СТОРОН</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">5.1. За неисполнение или ненадлежащее исполнение обязательств по настоящему Договору Стороны несут ответственность в соответствии с действующим законодательством Республики Беларусь.</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>6. ФОРС-МАЖОРНЫЕ ОБСТОЯТЕЛЬСТВА</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">6.1. Стороны освобождаются от ответственности за частичное или полное неисполнение обязательств по настоящему Договору, если это неисполнение явилось следствием обстоятельств непреодолимой силы.</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>7. ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">7.1. Все споры и разногласия, которые могут возникнуть из настоящего Договора или в связи с ним, будут по возможности разрешаться путем переговоров между Сторонами.</p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">7.2. В случае, если Стороны не придут к соглашению, споры подлежат рассмотрению в суде в соответствии с законодательством Республики Беларусь.</p>
      
      <p style="text-indent: 40px; margin-bottom: 10px;"><b>8. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</b></p>
      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">8.1. Настоящий Договор вступает в силу с момента его подписания и действует до полного исполнения Сторонами своих обязательств.</p>
      
      <p style="text-align: center; margin: 40px 0 20px 0;"><b>РЕКВИЗИТЫ И ПОДПИСИ СТОРОН</b></p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 20px;">
            <p><b>Заказчик:</b></p>
            <p><b>ООО «Бутик-Инвест»</b></p>
            <p>231337, Республика Беларусь,</p>
            <p>Гродненская обл., Ивьевский район,</p>
            <p>г. Ивье, ул. Энгельса 1, пом. 1</p>
            <p>УНП 592024719</p>
            <p>р/c BY69BAPB30129796500500000000</p>
            <p>в ОАО «Белагропромбанк», г. Минск</p>
            <p><br><br>______________________ О.Ю.Каспер</p>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 20px;">
            <p><b>Исполнитель:</b></p>
            <p>ФИО: ${executor}</p>
            <p>Адрес: ${address}</p>
            <p>Паспорт: ${passport}</p>
            <p>УНП: ${unp}</p>
            <p>Р/С: ${bankAccount}</p>
            <p>Банк: ${bankName}</p>
            <p>Код Банка: ${bankCode}</p>
            <p><br><br>______________________ ${initials}</p>
          </td>
        </tr>
      </table>

      <!-- Page break for Act -->
      <div style="page-break-before: always; margin-top: 60px;"></div>
      
      <h2 style="text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px;">АКТ ВЫПОЛНЕННЫХ РАБОТ</h2>
      <p style="text-align: center; margin-bottom: 30px;">к Договору № ${contractNumber} от ${date} г.</p>
      
      <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <span>Место составления: г. Минск</span>
        <span>Дата составления: ${actDate}</span>
      </div>

      <p style="text-align: justify; margin-bottom: 20px; text-indent: 40px;">
        <b>${executor}</b>, именуемый в дальнейшем «Исполнитель», УНП: <b>${unp}</b> действующий как самозанятый с уплатой налога на профессиональный доход, проживающий по адресу: <b>${address}</b> с одной стороны, и <b>ООО «Бутик-Инвест»</b>, именуемое в дальнейшем «Заказчик», в лице начальника отдела маркетинга Каспер Ольги Юрьевны, действующего на основании Доверенности от 01.10.2025 № 54, с другой стороны, а вместе именуемые «Стороны», составили настоящий Акт к договору № ${contractNumber} от ${date} о нижеследующем:
      </p>

      <p style="text-align: justify; margin-bottom: 20px; text-indent: 40px;">1. Исполнитель по заданию Заказчика выполнил в полном объеме следующие услуги:</p>
      
      <table style="width: 100%; border-collapse: collapse; border: 1px solid black; margin-bottom: 20px;">
        <tr>
          <td style="border: 1px solid black; padding: 10px; width: 70%;"><b>Наименование услуг:</b></td>
          <td style="border: 1px solid black; padding: 10px; width: 30%;"><b>Стоимость услуг</b></td>
        </tr>
        <tr>
          <td style="border: 1px solid black; padding: 10px;">Комплекс маркетинговых и рекламных услуг и услуг по съемке и монтажу видео-материалов.</td>
          <td style="border: 1px solid black; padding: 10px;">${cost}</td>
        </tr>
      </table>

      <p style="text-align: justify; margin-bottom: 10px; text-indent: 40px;">2. Стоимость оказания услуг, указанных в п.1 составляет ${cost} белорусских рублей.</p>
      <p style="text-align: justify; margin-bottom: 40px; text-indent: 40px;">3. Оплата производится путем перечисления Заказчиком денежных средств на расчетный счет Исполнителя. Моментом оплаты считается день поступления денежных средств на расчетный счет Исполнителя.</p>
      
      <p style="text-align: center; margin-bottom: 20px;"><b>РЕКВИЗИТЫ И ПОДПИСИ СТОРОН:</b></p>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; vertical-align: top; padding-right: 20px;">
            <p><b>Заказчик:</b></p>
            <p><b>ООО «Бутик-Инвест»</b></p>
            <p>231337, Республика Беларусь,</p>
            <p>Гродненская обл., Ивьевский район,</p>
            <p>г. Ивье, ул. Энгельса 1, пом. 1</p>
            <p>УНП 592024719</p>
            <p>р/c BY69BAPB30129796500500000000</p>
            <p>в ОАО «Белагропромбанк», г. Минск</p>
            <p><br><br>______________________ О.Ю.Каспер</p>
          </td>
          <td style="width: 50%; vertical-align: top; padding-left: 20px;">
            <p><b>Исполнитель:</b></p>
            <p>ФИО: ${executor}</p>
            <p>Адрес: ${address}</p>
            <p>Паспорт: ${passport}</p>
            <p>УНП: ${unp}</p>
            <p>Р/С: ${bankAccount}</p>
            <p>Банк: ${bankName}</p>
            <p>Код Банка: ${bankCode}</p>
            <p><br><br>______________________ ${initials}</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}
