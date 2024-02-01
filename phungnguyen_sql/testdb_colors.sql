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
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `hex_color` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Beige','#f5f5dc','active','2024-01-04 14:12:34','2024-01-04 14:12:34'),(2,'Milk','#e9e9e9','active','2024-01-04 14:13:31','2024-01-04 14:14:28'),(3,'Dusty-pink','#d8bfd8','active','2024-01-04 14:15:24','2024-01-04 14:15:24'),(4,'Black','#000000','active','2024-01-04 14:15:29','2024-01-04 14:15:29'),(5,'White','#ffffff','active','2024-01-04 14:15:38','2024-01-04 14:15:38'),(6,'Grey melange','#808080','active','2024-01-04 14:16:27','2024-01-12 07:26:04'),(7,'Dark-green','#006400','active','2024-01-04 14:16:46','2024-01-12 06:17:08'),(8,'Bordo','#800000','active','2024-01-04 14:17:04','2024-01-04 14:17:04'),(9,'Pink','#ff8b9f','active','2024-01-04 14:17:20','2024-01-04 14:19:01'),(10,'Light-pink','#ffb6c1','active','2024-01-04 14:18:55','2024-01-04 14:18:55'),(11,'Blue','#0000ff','active','2024-01-04 14:19:17','2024-01-04 14:19:17'),(12,'Peach','#ffdab9','active','2024-01-04 14:19:32','2024-01-04 14:19:32'),(13,'Silver','#c0c0c0','active','2024-01-04 14:19:53','2024-01-04 14:19:53'),(14,'Golden','#ffd700','active','2024-01-04 14:20:02','2024-01-04 14:20:02'),(15,'Black','#000000','deleted','2024-01-05 17:07:41','2024-01-12 08:15:17');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
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
