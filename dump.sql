-- MySQL dump 10.13  Distrib 9.0.1, for macos14 (arm64)
--
-- Host: localhost    Database: dbchamachurras
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ContactRequests`
--

DROP TABLE IF EXISTS `ContactRequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactRequests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `eventDate` date NOT NULL,
  `eventLocation` varchar(255) NOT NULL,
  `numberOfGuests` int NOT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `eventType` varchar(50) NOT NULL,
  `specialRequests` text,
  `startTime` time DEFAULT NULL,
  `endTime` time DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `message` text NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactRequests`
--

LOCK TABLES `ContactRequests` WRITE;
/*!40000 ALTER TABLE `ContactRequests` DISABLE KEYS */;
INSERT INTO `ContactRequests` VALUES (1,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','2024-12-19','asopdk',30,NULL,'Churrasco','aspokfposda','13:47:00','16:45:00','pending','apsdofkpoasdf','2024-12-12 15:45:40','2024-12-12 15:45:40'),(2,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','2024-12-27','Minha casa',30,NULL,'Outra Confraternização','APSODKpsoadkPOKASDPOASKD','21:32:00','03:44:00','pending','','2024-12-12 16:08:35','2024-12-12 16:08:35'),(3,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','2024-12-12','Minha casa',50,NULL,'Churrasco','PASodkpoAKSD','12:12:00','14:41:00','pending','sopakd','2024-12-12 16:43:25','2024-12-12 16:43:25'),(4,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','1212-12-12','12',12,NULL,'Casamento','12','12:12:00','13:13:00','pending','13','2024-12-12 16:48:31','2024-12-12 16:48:31'),(5,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','1212-12-12','12',12,NULL,'Casamento','12','12:12:00','12:12:00','pending','12','2024-12-12 16:51:13','2024-12-12 16:51:13'),(6,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','2024-12-20','asopdk',20,NULL,'Churrasco','ASLKDM','12:12:00','13:13:00','pending','aspod','2024-12-12 20:34:27','2024-12-12 20:34:27'),(7,'DIEGO HENRIQUE DINIZ','diegodinizh@icloud.com','(41) 99627-5112','2024-12-13','Minha casa',30,NULL,'Casamento','Preciso de Um assador top','12:12:00','14:14:00','pending','Muito top','2024-12-12 21:44:11','2024-12-12 21:44:11'),(8,'DIEGO HENRIQUE DINIZ','diegohdiniz@aluno.utfpr.edu.br','(41) 99627-5112','2024-12-24','Minha casa',12,NULL,'Churrasco','12','12:22:00','13:13:00','pending','123','2024-12-13 03:00:11','2024-12-13 03:00:11');
/*!40000 ALTER TABLE `ContactRequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contracts`
--

DROP TABLE IF EXISTS `Contracts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Contracts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientId` int NOT NULL,
  `providerId` int NOT NULL,
  `eventDate` datetime NOT NULL,
  `eventLocation` varchar(255) NOT NULL,
  `eventTime` time DEFAULT NULL,
  `estimatedWorkHours` decimal(5,2) DEFAULT NULL,
  `numberOfGuests` int NOT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clientId` (`clientId`),
  KEY `providerId` (`providerId`),
  CONSTRAINT `contracts_ibfk_17` FOREIGN KEY (`clientId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `contracts_ibfk_18` FOREIGN KEY (`providerId`) REFERENCES `ServiceProviders` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contracts`
--

LOCK TABLES `Contracts` WRITE;
/*!40000 ALTER TABLE `Contracts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Contracts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reviews`
--

DROP TABLE IF EXISTS `Reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contractId` int NOT NULL,
  `providerRating` int NOT NULL,
  `providerComment` text,
  `clientRating` int DEFAULT NULL,
  `clientComment` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `contractId` (`contractId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`contractId`) REFERENCES `Contracts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`providerRating` between 1 and 5)),
  CONSTRAINT `reviews_chk_2` CHECK ((`clientRating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reviews`
--

LOCK TABLES `Reviews` WRITE;
/*!40000 ALTER TABLE `Reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ServiceProviders`
--

DROP TABLE IF EXISTS `ServiceProviders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ServiceProviders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `specialty` varchar(255) DEFAULT NULL,
  `availableDates` text,
  `price` decimal(10,2) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `serviceproviders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ServiceProviders`
--

LOCK TABLES `ServiceProviders` WRITE;
/*!40000 ALTER TABLE `ServiceProviders` DISABLE KEYS */;
/*!40000 ALTER TABLE `ServiceProviders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `user_type` enum('cliente','prestador') NOT NULL DEFAULT 'cliente',
  `password` varchar(255) NOT NULL,
  `zip_code` varchar(15) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` timestamp NULL DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT '0.00',
  `isActive` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `email_10` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Diego Henrique Diniz','diegodinizh@icloud.com',NULL,'cliente','$2b$10$xsunVyGEaiBFMwBGdXAkiOSI3J5mfJKbvjP11OLA/tYAQkxLQhMWe',NULL,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM2MDA0Njk2LCJleHAiOjE3MzYwMDgyOTZ9._GBrwVZG5xeld1rpqAcvFFw8uWPXLYoEvuHsQ_bEkag','2025-01-04 16:31:36',0.00,'ativo','2025-01-04 14:36:18','2025-01-04 15:31:36',NULL),(2,'Diego Henrique Diniz','diegodinizh2@icloud.com',NULL,'cliente','$2b$10$6KUXKOdwXPuFKUitd56ZGOF3aL93Va8ZAMDEyTNQMqQg9ZZorVWYW',NULL,NULL,NULL,NULL,0.00,'ativo','2025-01-04 14:41:26','2025-01-04 14:41:26',NULL),(3,'Diego Henrique Diniz','diegodinizh3@icloud.com',NULL,'cliente','$2b$10$VLJHT8YWBVC4AL9yHVLhIOAsV8nwK6ZPkBgd85ghalkrOZDOdEdfG',NULL,NULL,NULL,NULL,0.00,'ativo','2025-01-04 14:53:29','2025-01-04 14:53:29',NULL),(4,'Diego Henrique Diniz','diegodinizh4@icloud.com',NULL,'cliente','$2b$10$py3QVU/SxEhV9gm1tGlUIuhElmOIKqSUnOvAHZTWMqOS8SHaPkQni',NULL,NULL,NULL,NULL,0.00,'ativo','2025-01-04 15:01:30','2025-01-04 15:01:30',NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-06  8:17:14
