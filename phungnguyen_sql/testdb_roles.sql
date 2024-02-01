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
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `short_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'product_manager','Product Manager','Quản lý sản phẩm','active','2024-01-24 07:56:14','2024-01-24 07:58:06'),(2,'admin','Admin','Quản trị','active','2024-01-24 08:30:50','2024-01-24 08:30:50'),(3,'importation_manager','Importation Manager','Quản lý xuất nhập khẩu','active','2024-01-25 08:34:18','2024-01-25 08:34:18'),(4,'accessory_manager','Accessory Manager','Quản lý kho phụ liệu','active','2024-01-25 08:35:00','2024-01-25 08:35:00'),(5,'cutting_group_manager','Cutting Group Manager','Quản lý tổ cắt','active','2024-01-25 08:35:32','2024-01-25 08:35:32'),(6,'sample_sewing_manager','Sample Sewing Manager','Quản lý may mẫu','active','2024-01-25 08:36:21','2024-01-25 08:36:21'),(7,'completion_manager','Completion Manager','Quản lý kho hoàn thành','active','2024-01-25 08:36:57','2024-01-25 08:36:57'),(8,'plan_manager','Plan Manager','Quản lý kế hoạch','active','2024-01-25 08:40:55','2024-01-25 09:09:39'),(13,'hcns','HCNS','Hành chính nhân sự','active','2024-01-25 09:10:08','2024-01-25 09:10:08'),(14,'accountant','Accountant','Kế toán','active','2024-01-25 09:10:40','2024-01-25 09:10:40');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
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
