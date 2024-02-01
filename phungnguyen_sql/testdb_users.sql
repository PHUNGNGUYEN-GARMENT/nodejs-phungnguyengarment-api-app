-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `is_admin` tinyint DEFAULT NULL,
  `access_token` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `work_description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `birthday` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nguyễn Hữu Hậu','huuhau.hh47','huuhau@123',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imh1dWhhdS5oaDQ3IiwicGFzc3dvcmQiOiJodXVoYXVAMTIzIiwiaWF0IjoxNzA2NjMxMjMzLCJleHAiOjE3MDcyMzYwMzN9.YKAE2IpmHt_uu3dPVBddlw10CcFIwnzm_Qgp6l0fFSg',NULL,'0123456789','Quản trị hệ thống','2001-04-27T08:30:50.874Z','active','2024-01-24 02:07:06','2024-01-30 16:13:53'),(9,'Nguyễn Công Chánh','congchanh@123','congchanh@123',0,NULL,NULL,'012345678','Hành chính nhân sự','1996-05-15T08:30:50.874Z','active','2024-01-24 03:32:04','2024-01-25 09:11:08'),(10,'Huỳnh Thị Mỹ Hạnh','myhanh2112','myhanh@123',0,NULL,NULL,'012345678','Làm kế toán, tính toán lương.','1986-07-09T08:30:50.874Z','active','2024-01-24 03:36:30','2024-01-25 09:10:58'),(16,'Ngô Diệp Tuý Quỳnh','tuyquynh_kehoach','abc@@123',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InR1eXF1eW5oX2tlaG9hY2giLCJwYXNzd29yZCI6ImFiY0BAMTIzIiwiaWF0IjoxNzA2NjMwNzQ5LCJleHAiOjE3MDcyMzU1NDl9.3qDqf3o0jytrm7M9s-HurykkoxaGGCfxfNiWU2vwFrk',NULL,'0123456789',NULL,'2024-01-25T08:10:43.515Z','active','2024-01-25 08:10:53','2024-01-30 16:05:49'),(17,'Ngô Hữu Tín','tin_xnk','abc@@123',0,NULL,NULL,'0123456789','Trưởng phòng xuất nhập khẩu','2024-01-25T09:12:36.853Z','active','2024-01-25 09:13:18','2024-01-25 09:13:18'),(18,'Thư','thu_dsn','abc@@123',0,NULL,NULL,'0123456789',NULL,'2024-01-25T09:13:31.018Z','active','2024-01-25 09:14:31','2024-01-25 09:14:31'),(19,'Hảo','hao_kpl','abc@@123',0,NULL,NULL,'0123456789',NULL,'2024-01-25T09:14:58.473Z','active','2024-01-25 09:15:42','2024-01-25 09:15:42'),(23,NULL,'soyoongdev','soyoongdev@123',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNveW9vbmdkZXYiLCJwYXNzd29yZCI6InNveW9vbmdkZXZAMTIzIiwiaWF0IjoxNzA2MzU5NzkxLCJleHAiOjE3MDY5NjQ1OTF9.MsSVgO1iIeBAb9ZkTpkHic8FRSiXaMW9tBKlpuPjNXo',NULL,NULL,NULL,NULL,NULL,'2024-01-27 10:03:41','2024-01-27 12:49:51');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01  8:05:05
