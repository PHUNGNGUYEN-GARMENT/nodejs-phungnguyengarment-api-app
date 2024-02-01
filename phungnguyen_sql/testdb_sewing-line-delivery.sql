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
-- Table structure for table `sewing-line-delivery`
--

DROP TABLE IF EXISTS `sewing-line-delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sewing-line-delivery` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sewing_line_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quantity_original` float DEFAULT NULL,
  `quantity_sewed` float DEFAULT NULL,
  `expired_date` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sewing_line_id` (`sewing_line_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sewing-line-delivery_ibfk_1` FOREIGN KEY (`sewing_line_id`) REFERENCES `sewing-line` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `sewing-line-delivery_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sewing-line-delivery`
--

LOCK TABLES `sewing-line-delivery` WRITE;
/*!40000 ALTER TABLE `sewing-line-delivery` DISABLE KEYS */;
INSERT INTO `sewing-line-delivery` VALUES (3,3,6,300,150,'2023-07-04 14:22:47','active','2024-01-11 17:15:24','2024-01-17 17:46:04'),(4,4,6,300,200,'2023-05-10 14:23:21','active','2024-01-11 17:15:24','2024-01-17 17:46:04'),(13,2,6,300,200,'2023-07-10 06:24:50','active','2024-01-12 06:16:20','2024-01-17 17:46:04'),(19,16,8,250,250,'2023-07-14 09:22:58','active','2024-01-18 09:21:26','2024-01-19 03:08:14'),(20,15,8,250,250,'2023-07-16 09:22:36','active','2024-01-18 09:21:26','2024-01-19 03:08:14'),(21,14,8,250,250,'2023-07-12 09:22:21','active','2024-01-18 09:21:26','2024-01-19 03:08:14'),(22,13,8,250,250,'2023-07-15 09:21:52','active','2024-01-18 09:21:26','2024-01-19 03:08:14'),(23,2,7,NULL,NULL,NULL,'active','2024-01-19 15:54:37','2024-01-19 15:54:37'),(24,1,7,1000,900,'2023-07-16 15:55:07','active','2024-01-19 15:54:37','2024-01-19 15:55:20'),(25,3,7,NULL,NULL,NULL,'active','2024-01-19 15:54:37','2024-01-19 15:54:37');
/*!40000 ALTER TABLE `sewing-line-delivery` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-01  8:05:06
