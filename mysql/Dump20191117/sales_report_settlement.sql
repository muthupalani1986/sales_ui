-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: sales_report
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `settlement`
--

DROP TABLE IF EXISTS `settlement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settlement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `settlement-id` varchar(45) DEFAULT NULL,
  `settlement-start-date` datetime DEFAULT NULL,
  `settlement-end-date` datetime DEFAULT NULL,
  `deposit-date` datetime DEFAULT NULL,
  `total-amount` decimal(19,2) DEFAULT '0.00',
  `currency` varchar(45) DEFAULT NULL,
  `transaction-type` varchar(45) DEFAULT NULL,
  `order-id` varchar(200) DEFAULT NULL,
  `merchant-order-id` varchar(200) DEFAULT NULL,
  `adjustment-id` varchar(200) DEFAULT NULL,
  `shipment-id` varchar(100) DEFAULT NULL,
  `marketplace-name` varchar(200) DEFAULT NULL,
  `shipment-fee-type` varchar(45) DEFAULT NULL,
  `shipment-fee-amount` decimal(19,2) DEFAULT NULL,
  `order-fee-type` varchar(45) DEFAULT NULL,
  `order-fee-amount` decimal(19,2) DEFAULT '0.00',
  `fulfillment-id` varchar(100) DEFAULT NULL,
  `posted-date` datetime DEFAULT NULL,
  `order-item-code` varchar(200) DEFAULT NULL,
  `merchant-order-item-id` varchar(200) DEFAULT NULL,
  `merchant-adjustment-item-id` varchar(200) DEFAULT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `quantity-purchased` int(11) DEFAULT NULL,
  `price-type` varchar(100) DEFAULT NULL,
  `price-amount` decimal(19,2) DEFAULT NULL,
  `item-related-fee-type` varchar(200) DEFAULT NULL,
  `item-related-fee-amount` decimal(19,2) DEFAULT '0.00',
  `misc-fee-amount` decimal(19,2) DEFAULT '0.00',
  `other-fee-amount` decimal(19,2) DEFAULT '0.00',
  `other-fee-reason-description` varchar(200) DEFAULT NULL,
  `promotion-id` varchar(100) DEFAULT NULL,
  `promotion-type` varchar(100) DEFAULT NULL,
  `promotion-amount` decimal(19,2) DEFAULT '0.00',
  `direct-payment-type` varchar(100) DEFAULT NULL,
  `direct-payment-amount` decimal(19,2) DEFAULT '0.00',
  `other-amount` decimal(19,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settlement`
--

LOCK TABLES `settlement` WRITE;
/*!40000 ALTER TABLE `settlement` DISABLE KEYS */;
/*!40000 ALTER TABLE `settlement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-17  1:25:48
