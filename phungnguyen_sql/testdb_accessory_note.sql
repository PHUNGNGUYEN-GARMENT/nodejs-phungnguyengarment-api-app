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
-- Table structure for table `accessory_note`
--

DROP TABLE IF EXISTS `accessory_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessory_note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `summary` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessory_note`
--

LOCK TABLES `accessory_note` WRITE;
/*!40000 ALTER TABLE `accessory_note` DISABLE KEYS */;
INSERT INTO `accessory_note` VALUES (1,'Chỉ (Thiếu)',NULL,'active','2024-01-04 14:28:36','2024-01-04 14:29:05'),(2,'Dây (Thiếu)',NULL,'active','2024-01-04 14:28:54','2024-01-04 14:28:54'),(3,'Nhãn (Thiếu)',NULL,'active','2024-01-04 14:29:17','2024-01-04 14:29:17'),(4,'Nút (Thiếu)',NULL,'active','2024-01-04 14:29:27','2024-01-04 14:29:27'),(5,'Thẻ bài (Dán trực tiếp lên áo)',NULL,'active','2024-01-04 14:30:11','2024-01-04 14:30:11'),(6,'Thẻ bài (Đang sỏ)',NULL,'active','2024-01-04 14:30:21','2024-01-04 14:30:21'),(7,'Thẻ bài (Chưa nhập)',NULL,'active','2024-01-04 14:30:49','2024-01-04 14:31:26'),(8,'Thẻ bài (Nhập rồi)',NULL,'active','2024-01-04 14:31:07','2024-01-04 14:31:07'),(9,'Chỉ',NULL,'active','2024-01-05 02:45:46','2024-01-05 02:45:46'),(10,'Nhãn',NULL,'active','2024-01-05 02:45:52','2024-01-05 02:45:52'),(11,'Dây',NULL,'active','2024-01-05 02:45:56','2024-01-05 02:45:56'),(12,'Nút',NULL,'active','2024-01-05 02:46:00','2024-01-05 02:46:00');
/*!40000 ALTER TABLE `accessory_note` ENABLE KEYS */;
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
