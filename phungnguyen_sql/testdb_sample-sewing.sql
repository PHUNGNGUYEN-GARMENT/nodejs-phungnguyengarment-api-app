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
-- Table structure for table `sample-sewing`
--

DROP TABLE IF EXISTS `sample-sewing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample-sewing` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `date_submission_npl` datetime DEFAULT NULL,
  `date_approval_so` datetime DEFAULT NULL,
  `date_approval_pp` datetime DEFAULT NULL,
  `date_submission_first_time` datetime DEFAULT NULL,
  `date_submission_second_time` datetime DEFAULT NULL,
  `date_submission_third_time` datetime DEFAULT NULL,
  `date_submission_forth_time` datetime DEFAULT NULL,
  `date_submission_fifth_time` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sample-sewing_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample-sewing`
--

LOCK TABLES `sample-sewing` WRITE;
/*!40000 ALTER TABLE `sample-sewing` DISABLE KEYS */;
INSERT INTO `sample-sewing` VALUES (1,1,'2023-04-26 02:15:35','2024-01-16 15:35:08','2023-05-22 02:15:49','2023-05-11 02:29:11',NULL,NULL,NULL,NULL,'active','2024-01-05 02:16:19','2024-01-13 15:35:09'),(2,2,'2023-04-26 02:34:11','2024-01-30 15:35:11','2023-05-22 02:34:22','2023-05-11 02:34:43',NULL,NULL,NULL,NULL,'active','2024-01-05 02:34:30','2024-01-13 15:35:12'),(3,3,'2023-04-28 02:37:23',NULL,'2023-05-17 02:39:21','2023-05-15 02:39:33',NULL,NULL,NULL,NULL,'active','2024-01-05 02:39:39','2024-01-05 02:39:39'),(4,5,'2023-04-28 02:40:09',NULL,'2023-05-17 09:16:49','2023-04-16 04:08:59',NULL,NULL,NULL,NULL,'active','2024-01-05 02:40:56','2024-01-05 09:16:57'),(7,6,'2023-01-11 15:24:16','2023-01-16 15:24:22','2023-01-10 15:24:19','2024-01-10 15:24:27','2024-01-11 15:24:29','2024-01-12 15:24:30','2024-01-13 15:24:34','2024-01-14 15:24:36','active','2024-01-11 06:37:36','2024-01-18 15:24:41'),(10,8,'2024-01-01 10:56:58','2024-01-03 10:59:40','2024-01-02 10:59:39','2024-01-04 10:59:47','2024-01-05 10:59:49','2024-01-06 10:59:51','2024-01-07 10:59:53','2024-01-08 10:59:55','active','2024-01-15 10:59:41','2024-01-15 10:59:55'),(11,10,'2024-01-03 03:54:06',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'active','2024-01-26 03:54:07','2024-01-26 03:54:07');
/*!40000 ALTER TABLE `sample-sewing` ENABLE KEYS */;
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
