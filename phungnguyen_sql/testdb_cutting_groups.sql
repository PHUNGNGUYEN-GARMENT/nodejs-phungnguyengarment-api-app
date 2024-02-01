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
-- Table structure for table `cutting_groups`
--

DROP TABLE IF EXISTS `cutting_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cutting_groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity_real_cut` float DEFAULT NULL,
  `time_cut` datetime DEFAULT NULL,
  `date_send_embroidered` datetime DEFAULT NULL,
  `quantity_delivered_btp` float DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `sync_status` tinyint(1) DEFAULT NULL,
  `date_arrived_1th` datetime DEFAULT NULL,
  `quantity_arrived_1th` float DEFAULT NULL,
  `date_arrived_2th` datetime DEFAULT NULL,
  `quantity_arrived_2th` float DEFAULT NULL,
  `date_arrived_3th` datetime DEFAULT NULL,
  `quantity_arrived_3th` float DEFAULT NULL,
  `date_arrived_4th` datetime DEFAULT NULL,
  `quantity_arrived_4th` float DEFAULT NULL,
  `date_arrived_5th` datetime DEFAULT NULL,
  `quantity_arrived_5th` float DEFAULT NULL,
  `date_arrived_6th` datetime DEFAULT NULL,
  `quantity_arrived_6th` float DEFAULT NULL,
  `date_arrived_7th` datetime DEFAULT NULL,
  `quantity_arrived_7th` float DEFAULT NULL,
  `date_arrived_8th` datetime DEFAULT NULL,
  `quantity_arrived_8th` float DEFAULT NULL,
  `date_arrived_th` datetime DEFAULT NULL,
  `quantity_arrived_9th` float DEFAULT NULL,
  `date_arrived_10th` datetime DEFAULT NULL,
  `quantity_arrived_10th` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cutting_groups_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cutting_groups`
--

LOCK TABLES `cutting_groups` WRITE;
/*!40000 ALTER TABLE `cutting_groups` DISABLE KEYS */;
INSERT INTO `cutting_groups` VALUES (1,8,1200,'2024-01-02 17:43:59',NULL,0,'active',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-01-14 17:44:01','2024-01-16 06:52:13');
/*!40000 ALTER TABLE `cutting_groups` ENABLE KEYS */;
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
