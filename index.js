const nodemailer = require("nodemailer");
const certifiedUsers = require("./certified-users.json");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

const mailOptions = {
  from: '"Coordenação do Projeto de Inteligência Artificial Aplicada aos Serviços da Saúde" <iaservicosasaudeufrr@gmail.com>',
  subject: "CERTIFICADOS DO CURSO IA NA SAÚDE [MÓDULO 1]",
  text: "Prezados(as) Alunos(as), É com grande satisfação que enviamos, em anexo, os certificados de conclusão do Primeiro Módulo do curso IA APLICADA AOS SERVIÇOS DA SAÚDE. Gostaríamos de parabenizá-los pelo empenho e dedicação demonstrados até aqui. Continuem com o excelente trabalho, pois estamos certos de que o conhecimento adquirido ao longo do curso será de grande valia para suas carreiras profissionais e pessoais. Caso haja qualquer dúvida ou necessidade de correção nos certificados, por favor, não hesitem em nos contatar através deste email. Agradecemos a participação de todos e desejamos sucesso nos próximos módulos do curso. Atenciosamente, Coordenação do Projeto de IA na saúde.",
  html: "<p>Prezados(as) Alunos(as),</p><p>É com grande satisfação que enviamos, em anexo, os certificados de conclusão do Primeiro Módulo do curso IA APLICADA AOS SERVIÇOS DA SAÚDE.</p><p>Gostaríamos de parabenizá-los pelo empenho e dedicação demonstrados até aqui. Continuem com o excelente trabalho, pois estamos certos de que o conhecimento adquirido ao longo do curso será de grande valia para suas carreiras profissionais e pessoais.</p><p>Caso haja qualquer dúvida ou necessidade de correção nos certificados, por favor, não hesitem em nos contatar através deste email.</p><p>Agradecemos a participação de todos e desejamos sucesso nos próximos módulos do curso.</p><p>Atenciosamente,<br>Coordenação do Projeto de IA na saúde.</p>",
};

async function main() {
  await Promise.all(
    certifiedUsers.map(async ({ name, mail, certificates }, index) => {
      const result = await transporter.sendMail({
        ...mailOptions,
        to: mail,
        attachments: certificates.map((filename) => ({
          filename,
          contentType: "application/pdf",
          path: `${__dirname}/certificates/${filename}`,
        })),
      });

      console.log(
        `${index}: E-mail enviado para ${name}<${mail}>. \n${result.messageId}`
      );
    })
  );

  console.log("Todos os e-mails foram enviados com sucesso ✅");
}

main().catch(console.error);
