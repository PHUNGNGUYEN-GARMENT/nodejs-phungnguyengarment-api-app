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
-- Table structure for table `sewing-line`
--

DROP TABLE IF EXISTS `sewing-line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sewing-line` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sewing-line`
--

LOCK TABLES `sewing-line` WRITE;
/*!40000 ALTER TABLE `sewing-line` DISABLE KEYS */;
INSERT INTO `sewing-line` VALUES (1,'Chuyền 1','active','2024-01-04 14:23:04','2024-01-11 17:22:06'),(2,'Chuyền 2','active','2024-01-04 14:23:07','2024-01-11 17:22:12'),(3,'Chuyền 3','active','2024-01-04 14:23:10','2024-01-11 17:22:18'),(4,'Chuyền 4','active','2024-01-04 14:23:14','2024-01-11 17:22:24'),(5,'Chuyền 5','active','2024-01-04 14:23:17','2024-01-12 06:50:13'),(6,'Chuyền 6','active','2024-01-04 14:23:20','2024-01-11 17:19:42'),(7,'Chuyền 7','active','2024-01-04 14:23:23','2024-01-11 17:19:47'),(8,'Chuyền 8','active','2024-01-04 14:23:26','2024-01-11 17:19:52'),(9,'Chuyền 9','active','2024-01-04 14:23:30','2024-01-11 17:19:58'),(10,'Chuyền 10','active','2024-01-04 14:23:35','2024-01-12 06:43:11'),(11,'Chuyền 11','active','2024-01-04 14:23:40','2024-01-11 17:16:56'),(12,'Chuyền 12','active','2024-01-04 14:23:43','2024-01-11 17:17:03'),(13,'Chuyền 13','active','2024-01-04 14:23:49','2024-01-11 17:17:09'),(14,'Chuyền 14','active','2024-01-04 14:23:52','2024-01-11 17:17:16'),(15,'Chuyền 15','active','2024-01-04 14:23:55','2024-01-11 17:16:37'),(16,'Chuyền 16','active','2024-01-04 14:23:58','2024-01-11 17:16:32'),(17,'Chuyền 17','active','2024-01-04 14:24:03','2024-01-11 17:16:25'),(18,'Chuyền 18','active','2024-01-04 14:24:07','2024-01-11 17:16:19'),(19,'Chuyền 19','active','2024-01-04 14:24:11','2024-01-11 17:16:12');
/*!40000 ALTER TABLE `sewing-line` ENABLE KEYS */;
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
