-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: BookmyShow
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `Booking`
--

DROP TABLE IF EXISTS `Booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Booking` (
  `BookingID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `TicketID` int NOT NULL,
  `BookingDate` datetime NOT NULL,
  PRIMARY KEY (`BookingID`),
  KEY `UserID` (`UserID`),
  KEY `TicketID` (`TicketID`),
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`),
  CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`TicketID`) REFERENCES `Ticket` (`TicketID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Booking`
--

LOCK TABLES `Booking` WRITE;
/*!40000 ALTER TABLE `Booking` DISABLE KEYS */;
INSERT INTO `Booking` VALUES (1,1,1,'2019-07-01 08:00:00'),(2,1,2,'2019-07-01 08:00:00'),(3,1,3,'2019-07-01 08:00:00');
/*!40000 ALTER TABLE `Booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movie`
--

DROP TABLE IF EXISTS `Movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Movie` (
  `MovieID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Language` varchar(255) NOT NULL,
  `Genre` varchar(255) NOT NULL,
  `Duration` varchar(255) NOT NULL,
  `ReleaseDate` date NOT NULL,
  `Rating` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`MovieID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movie`
--

LOCK TABLES `Movie` WRITE;
/*!40000 ALTER TABLE `Movie` DISABLE KEYS */;
INSERT INTO `Movie` VALUES (1,'Avengers: Endgame','English','Action','3h 2m','2019-04-26','PG-13'),(2,'Cast Away','English','Drama','2h 55m','2019-06-21','A'),(3,'Gone Girl','English','Crime','2h 10m','2019-06-28','A');
/*!40000 ALTER TABLE `Movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Show`
--

DROP TABLE IF EXISTS `Show`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Show` (
  `ShowID` int NOT NULL AUTO_INCREMENT,
  `TheatreID` int NOT NULL,
  `MovieID` int NOT NULL,
  `ShowDate` date NOT NULL,
  `ShowTime` time NOT NULL,
  PRIMARY KEY (`ShowID`),
  KEY `TheatreID` (`TheatreID`),
  KEY `MovieID` (`MovieID`),
  CONSTRAINT `show_ibfk_1` FOREIGN KEY (`TheatreID`) REFERENCES `Theatre` (`TheatreID`),
  CONSTRAINT `show_ibfk_2` FOREIGN KEY (`MovieID`) REFERENCES `Movie` (`MovieID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Show`
--

LOCK TABLES `Show` WRITE;
/*!40000 ALTER TABLE `Show` DISABLE KEYS */;
INSERT INTO `Show` VALUES (1,1,1,'2019-07-01','09:00:00'),(2,1,1,'2019-07-01','12:00:00'),(3,1,1,'2019-07-01','15:00:00'),(4,1,1,'2019-07-01','18:00:00'),(5,1,1,'2019-07-01','21:00:00'),(6,1,2,'2019-07-01','09:00:00');
/*!40000 ALTER TABLE `Show` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Theatre`
--

DROP TABLE IF EXISTS `Theatre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Theatre` (
  `TheatreID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Location` varchar(255) NOT NULL,
  PRIMARY KEY (`TheatreID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Theatre`
--

LOCK TABLES `Theatre` WRITE;
/*!40000 ALTER TABLE `Theatre` DISABLE KEYS */;
INSERT INTO `Theatre` VALUES (1,'PVR','Mumbai'),(2,'INOX','Delhi'),(3,'Carnival','Bangalore');
/*!40000 ALTER TABLE `Theatre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ticket`
--

DROP TABLE IF EXISTS `Ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ticket` (
  `TicketID` int NOT NULL AUTO_INCREMENT,
  `ShowID` int NOT NULL,
  `TheatreID` int NOT NULL,
  `SeatNumber` varchar(255) NOT NULL,
  `Price` int NOT NULL,
  PRIMARY KEY (`TicketID`),
  KEY `ShowID` (`ShowID`),
  KEY `TheatreID` (`TheatreID`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`ShowID`) REFERENCES `Show` (`ShowID`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`TheatreID`) REFERENCES `Theatre` (`TheatreID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ticket`
--

LOCK TABLES `Ticket` WRITE;
/*!40000 ALTER TABLE `Ticket` DISABLE KEYS */;
INSERT INTO `Ticket` VALUES (1,1,1,'A1',300),(2,1,1,'A2',300),(3,1,1,'A3',300),(4,1,1,'A4',300),(5,1,1,'A5',300);
/*!40000 ALTER TABLE `Ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (1,'John Doe','johndoe@example.com','9876543210','#<123456>'),(2,'Jane Doe','janedoe@example.com','9876543211','#<123456>');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'BookmyShow'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-10 10:22:13
