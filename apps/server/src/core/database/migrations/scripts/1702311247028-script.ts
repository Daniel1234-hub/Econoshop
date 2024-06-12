import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('674149c3-44eb-4d0e-9f47-153f4bdaa044', '1Hazel.Kessler@gmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=3', 'cus_L2mN3o4p5q6r7s', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('08264501-538b-4e4b-b5e8-be5ae677cd3c', '8Alverta_Yundt-Stoltenberg90@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_N4sT5u6v7w8x9y', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('f73411fa-3380-4af5-abe6-7d9ce4e645f0', '15Ward.Breitenberg83@yahoo.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_K1fG2h3i4j5k6l', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('b0293ae9-825e-490c-ba7f-d6d4d063d728', '22Halie74@yahoo.com', 'Emily Davis', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_L2mN3o4p5q6r7s', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('7d6b6dd3-372a-4ee4-a780-d5dd513849e2', '29Jay.OKeefe53@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=31', 'cus_J0eX1a2b3c4d5e', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('92de222d-1f08-491c-9340-f1ca88113416', '43Damien.Hettinger@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_K1fG2h3i4j5k6l', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('4f9ca146-ce9d-4045-835b-e92caa0ca1c1', '50Jamel_Lemke72@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_J0eX1a2b3c4d5e', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('b0e4b2cb-358c-4cf7-9616-7fe518d38f63', '57Josefa.Carter@hotmail.com', 'Michael Brown', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_M3pQ4r5s6t7u8v', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('69663c4e-4dd0-4640-a2db-370753caddcc', '64Alicia.Fadel63@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=66', 'cus_M3pQ4r5s6t7u8v', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f078e3d7-f7c7-4ca3-a12d-5f22ab94b038', 'Actualizacin de Inventario', 'Recuerda que tu pago est prximo a vencer.', 'Luis Martnez', '74Dayne_Haag83@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=75', 'https://i.imgur.com/YfJQV5z.png?id=76', 'b0293ae9-825e-490c-ba7f-d6d4d063d728');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('ee0e756e-86f3-4a82-8ef2-df2497099504', 'Nueva Promocin Disponible', 'Se ha detectado un inicio de sesin sospechoso en tu cuenta.', 'Ana Gmez', '81Marisa73@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=82', 'https://i.imgur.com/YfJQV5z.png?id=83', '08264501-538b-4e4b-b5e8-be5ae677cd3c');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('57e31df8-95a0-4b49-b3d9-56fa7b84d17e', 'Notificacin de Seguridad', 'Gracias por registrarte en nuestro sistema de gestin.', 'Juan Prez', '88Rafaela_Bashirian63@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('1ec8b22b-9824-4a75-9fa6-680837f3ee03', 'Actualizacin de Inventario', 'Aprovecha nuestras ofertas especiales por tiempo limitado.', 'Carlos Lpez', '95Johnnie.Sanford@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=96', 'https://i.imgur.com/YfJQV5z.png?id=97', 'b0293ae9-825e-490c-ba7f-d6d4d063d728');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f17107fd-aad8-45a4-b071-b95cab2e1704', 'Nueva Promocin Disponible', 'Gracias por registrarte en nuestro sistema de gestin.', 'Juan Prez', '102Duncan_Franey@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=103', 'https://i.imgur.com/YfJQV5z.png?id=104', '674149c3-44eb-4d0e-9f47-153f4bdaa044');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('2b9de869-c4fd-4848-a38b-0b0451f38b22', 'Actualizacin de Inventario', 'Se ha detectado un inicio de sesin sospechoso en tu cuenta.', 'Juan Prez', '109Wilfred.Lueilwitz79@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=110', 'https://i.imgur.com/YfJQV5z.png?id=111', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('1a0e8093-319d-4ee6-ab2a-00985cf35025', 'Notificacin de Seguridad', 'Gracias por registrarte en nuestro sistema de gestin.', 'Carlos Lpez', '116Cecile.Kilback@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=117', 'https://i.imgur.com/YfJQV5z.png?id=118', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('c411bf8f-794c-4183-b0ca-618399ebde63', 'Actualizacin de Inventario', 'Gracias por registrarte en nuestro sistema de gestin.', 'Ana Gmez', '123Pearline14@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=124', 'https://i.imgur.com/YfJQV5z.png?id=125', 'b0e4b2cb-358c-4cf7-9616-7fe518d38f63');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('f3bda758-6c01-4c3d-8882-05a8eb117563', 'Nueva Promocin Disponible', 'Aprovecha nuestras ofertas especiales por tiempo limitado.', 'Juan Prez', '130Rosendo_Wisoky@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=131', 'https://i.imgur.com/YfJQV5z.png?id=132', '69663c4e-4dd0-4640-a2db-370753caddcc');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('bdc540c8-221e-4e4f-bbb9-a88ddd3a8a69', 'Bienvenido al Sistema', 'Se ha detectado un inicio de sesin sospechoso en tu cuenta.', 'Ana Gmez', '137Montana.Berge@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=138', 'https://i.imgur.com/YfJQV5z.png?id=139', '69663c4e-4dd0-4640-a2db-370753caddcc');

INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('fe9329f5-47cc-4823-8ff7-37ff7b3787bc', 'Fresh Produce Ltd.', 'contactdairydelights.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('6ee4c828-5b46-4de4-9af1-7b9291d50941', 'Beverage Masters', 'contactdairydelights.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('e171f040-ab40-4707-9e0d-0d3740afc919', 'Beverage Masters', 'supportfreshproduce.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('ce9c77c6-55a7-4a40-bbc9-10faa69c1fd2', 'Snack Haven', 'salesbeveragemasters.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('48e66536-6126-4edb-98e1-5aa3a4d4f0c0', 'Snack Haven', 'supportfreshproduce.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('8c6ad7c8-c1fe-4d9f-b393-046add82f0e0', 'Global Foods Inc.', 'infoglobalfoods.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('c38599e6-fc54-499e-9aee-540df79dfd42', 'Beverage Masters', 'supportfreshproduce.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('26dda056-a75f-4186-ad3f-57100df45225', 'Fresh Produce Ltd.', 'infosnackhaven.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('94ab9745-d3b2-4360-879f-3073b107ae15', 'Beverage Masters', 'infoglobalfoods.com');
INSERT INTO "supplier" ("id", "name", "contactInformation") VALUES ('844eb3f6-fb82-4aff-9749-261d66ab88a7', 'Dairy Delights Co.', 'salesbeveragemasters.com');

INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('3b837b1f-6c54-40ac-893b-67d0de42b779', 'Milk', 'Bakery', 252, 970, '48e66536-6126-4edb-98e1-5aa3a4d4f0c0');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('742dca1f-2a3f-4943-b279-f3f0587259d5', 'Chicken Breast', 'Meat', 867, 719, 'c38599e6-fc54-499e-9aee-540df79dfd42');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('e2581484-4344-4efd-b714-cb272e775ff1', 'Apple', 'Fruits', 476, 388, '26dda056-a75f-4186-ad3f-57100df45225');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('cdc6ec64-8928-4ba7-aa1a-4878d8e7a396', 'Bread', 'Dairy', 578, 9, 'c38599e6-fc54-499e-9aee-540df79dfd42');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('34e835a8-adcb-4fc6-b070-f74e8392323d', 'Apple', 'Dairy', 179, 137, '6ee4c828-5b46-4de4-9af1-7b9291d50941');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('ce3f573f-9804-4a92-9819-96e93fb5fd30', 'Chicken Breast', 'Bakery', 727, 533, 'c38599e6-fc54-499e-9aee-540df79dfd42');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('009578d2-5851-4662-a254-a7a8d519d750', 'Banana', 'Fruits', 503, 233, '26dda056-a75f-4186-ad3f-57100df45225');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('a3ef5e1e-c677-4368-bf9f-c5f8138e1ced', 'Chicken Breast', 'Bakery', 66, 860, 'ce9c77c6-55a7-4a40-bbc9-10faa69c1fd2');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('fed99318-aac0-4a6b-ac87-b5507f94589c', 'Milk', 'Bakery', 759, 304, '6ee4c828-5b46-4de4-9af1-7b9291d50941');
INSERT INTO "product" ("id", "name", "category", "quantity", "price", "supplierId") VALUES ('a552c9b0-f30e-45ab-99af-427d08dec733', 'Chicken Breast', 'Fruits', 279, 558, 'c38599e6-fc54-499e-9aee-540df79dfd42');

INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('095f7753-158d-45f3-a04c-0174f075df04', 'Maria Gomez', 'ana.martinezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('2912e325-7653-441d-959e-0ebb6b326b93', 'Luis Fernandez', 'maria.gomezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('9fba2945-293e-48b5-bad7-f1965954a3ae', 'Maria Gomez', 'maria.gomezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('963ab101-3bf5-4763-83e7-5eedbf136a9f', 'Juan Perez', 'juan.perezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('33fc8fc2-0c3b-46ff-9e53-a1661e213043', 'Juan Perez', 'luis.fernandezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('f59619b7-8f61-428a-99dd-9b2cac576965', 'Luis Fernandez', 'juan.perezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('56f4a9b2-83bc-4565-a8f5-67006dee583e', 'Juan Perez', 'carlos.rodriguezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('73b644ca-febb-4cec-bb56-2cd09759ded1', 'Juan Perez', 'maria.gomezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('bc706f28-579e-42be-b55c-c2aeeb3533ce', 'Maria Gomez', 'juan.perezexample.com');
INSERT INTO "customer" ("id", "name", "contactInformation") VALUES ('93a52467-66c6-41e4-b040-3916e4f25ae1', 'Luis Fernandez', 'juan.perezexample.com');

INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('8132f305-38de-4e0f-bca3-c683f512e2fb', 'Luis Fernndez', '252Gwen60@gmail.com', 'Cajero', '08264501-538b-4e4b-b5e8-be5ae677cd3c');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('757118b6-778c-4197-bd66-712a95be82df', 'Carlos Mendoza', '256Consuelo59@hotmail.com', 'Supervisor', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('ffc8b0b4-9fa1-41b3-a2c6-80c017b1ea34', 'Ana Garca', '260Theresia_Nienow10@hotmail.com', 'Reponedor', '92de222d-1f08-491c-9340-f1ca88113416');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('dab1d87a-f515-40ef-bc1f-354dfb2fd76b', 'Mara Lpez', '264Ara.Fisher@hotmail.com', 'Administrador', '4f9ca146-ce9d-4045-835b-e92caa0ca1c1');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('7838d132-de57-48d1-9135-698802b49f4e', 'Luis Fernndez', '268Scottie_Collier-Crona82@yahoo.com', 'Administrador', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('1e014a3a-6a79-45af-8a35-5b9a91c14f26', 'Jorge Rodrguez', '272Cristian_Kuhlman53@yahoo.com', 'Gerente', '7d6b6dd3-372a-4ee4-a780-d5dd513849e2');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('bb5b610a-44e6-4bce-b5ac-d1a95acc02de', 'Luis Fernndez', '276Sunny.Bernier26@yahoo.com', 'Reponedor', '69663c4e-4dd0-4640-a2db-370753caddcc');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('2352063b-febc-4f7e-af13-dd64da552c93', 'Ana Garca', '280Anthony.Watsica20@hotmail.com', 'Gerente', 'f73411fa-3380-4af5-abe6-7d9ce4e645f0');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('781e0e9f-ac0c-4f5d-b481-2fcf50e977a3', 'Luis Fernndez', '284Jerrold_Schinner@yahoo.com', 'Reponedor', 'b0293ae9-825e-490c-ba7f-d6d4d063d728');
INSERT INTO "employee" ("id", "name", "email", "role", "userId") VALUES ('87769ab9-1537-4292-bf93-e4ab4070fb41', 'Jorge Rodrguez', '288David_Spinka@gmail.com', 'Administrador', 'b0e4b2cb-358c-4cf7-9616-7fe518d38f63');

INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('9d2c6cab-fff9-46fb-8708-efb27668246b', 23, '2023-07-13T05:45:26.004Z', 'dab1d87a-f515-40ef-bc1f-354dfb2fd76b', '095f7753-158d-45f3-a04c-0174f075df04');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('4dabb8f0-5de7-4233-b234-4f0a8fe01d25', 558, '2024-01-22T18:33:46.233Z', 'bb5b610a-44e6-4bce-b5ac-d1a95acc02de', 'bc706f28-579e-42be-b55c-c2aeeb3533ce');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('67d20397-5906-4fba-b624-dfcce9f4e506', 342, '2023-12-25T22:18:15.426Z', '87769ab9-1537-4292-bf93-e4ab4070fb41', 'f59619b7-8f61-428a-99dd-9b2cac576965');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('c2c741ec-21d1-4946-b629-a9dedc4667c7', 94, '2024-12-17T08:25:21.652Z', '1e014a3a-6a79-45af-8a35-5b9a91c14f26', '33fc8fc2-0c3b-46ff-9e53-a1661e213043');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('0942eeb3-746f-4cc5-a178-f2a5cd19ee85', 863, '2023-10-08T23:36:05.914Z', '7838d132-de57-48d1-9135-698802b49f4e', '56f4a9b2-83bc-4565-a8f5-67006dee583e');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('9e3bbf11-b8bf-4bbb-91d5-1ec4a5966c96', 532, '2024-06-18T23:34:02.849Z', 'bb5b610a-44e6-4bce-b5ac-d1a95acc02de', '095f7753-158d-45f3-a04c-0174f075df04');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('796fe188-a0c3-4058-96c2-fb155fc25d46', 373, '2024-07-20T15:04:02.710Z', 'ffc8b0b4-9fa1-41b3-a2c6-80c017b1ea34', '73b644ca-febb-4cec-bb56-2cd09759ded1');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('a737bb4c-d4cd-467b-a98e-96b03f4c3273', 687, '2025-06-05T12:27:57.526Z', '87769ab9-1537-4292-bf93-e4ab4070fb41', '9fba2945-293e-48b5-bad7-f1965954a3ae');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('cd5e5231-c3d4-407f-9a1f-1e0dd2778d3a', 669, '2025-05-15T11:20:56.274Z', 'bb5b610a-44e6-4bce-b5ac-d1a95acc02de', 'f59619b7-8f61-428a-99dd-9b2cac576965');
INSERT INTO "transaction" ("id", "totalPrice", "transactionDate", "employeeId", "customerId") VALUES ('bd81f2be-3971-49ff-acb5-2eb87c49c394', 346, '2024-08-27T01:55:45.266Z', 'dab1d87a-f515-40ef-bc1f-354dfb2fd76b', '963ab101-3bf5-4763-83e7-5eedbf136a9f');

INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('8af90c3b-f8f5-4cc8-8693-d23ee8dc76c4', 535, 434, 'a737bb4c-d4cd-467b-a98e-96b03f4c3273', 'cdc6ec64-8928-4ba7-aa1a-4878d8e7a396');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('e43fcea1-d1de-46f1-b6fd-cb2988ba70bf', 528, 857, 'cd5e5231-c3d4-407f-9a1f-1e0dd2778d3a', '742dca1f-2a3f-4943-b279-f3f0587259d5');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('0958a24a-47e4-4125-98b4-069c22b785e4', 554, 435, 'bd81f2be-3971-49ff-acb5-2eb87c49c394', 'a3ef5e1e-c677-4368-bf9f-c5f8138e1ced');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('e471be06-ab23-439f-b75f-3f81a1d441da', 312, 506, '9d2c6cab-fff9-46fb-8708-efb27668246b', 'e2581484-4344-4efd-b714-cb272e775ff1');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('b1afaa2e-20c9-4da8-b3b5-eef3ccba7e41', 414, 22, '796fe188-a0c3-4058-96c2-fb155fc25d46', 'a552c9b0-f30e-45ab-99af-427d08dec733');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('378d6af8-6046-43af-a7aa-18439b26178f', 322, 998, '4dabb8f0-5de7-4233-b234-4f0a8fe01d25', 'fed99318-aac0-4a6b-ac87-b5507f94589c');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('16c8bd27-5d9f-4428-9ac6-a874ceab21cf', 356, 259, '0942eeb3-746f-4cc5-a178-f2a5cd19ee85', 'cdc6ec64-8928-4ba7-aa1a-4878d8e7a396');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('97f624d9-dac1-4916-8f80-0ca23752633d', 755, 645, '9e3bbf11-b8bf-4bbb-91d5-1ec4a5966c96', '34e835a8-adcb-4fc6-b070-f74e8392323d');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('76cfe284-1cde-4471-80c8-8179ff39fec0', 454, 6, '9d2c6cab-fff9-46fb-8708-efb27668246b', '34e835a8-adcb-4fc6-b070-f74e8392323d');
INSERT INTO "transaction_product" ("id", "quantity", "price", "transactionId", "productId") VALUES ('617f02d5-f1f0-4be4-a9e8-e1fa7ca82a7d', 286, 642, '67d20397-5906-4fba-b624-dfcce9f4e506', 'a552c9b0-f30e-45ab-99af-427d08dec733');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
