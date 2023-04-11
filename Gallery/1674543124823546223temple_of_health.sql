-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 15, 2022 at 02:40 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `temple_of_health`
--

-- --------------------------------------------------------

--
-- Table structure for table `eventBookings`
--

CREATE TABLE `eventBookings` (
  `eventBookingId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `eventTypeId` int(11) NOT NULL,
  `eventSessionId` int(11) NOT NULL,
  `ticketCount` int(11) NOT NULL,
  `ticketFee` varchar(45) NOT NULL,
  `totalPaidFee` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `transactionId` text NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventBookings`
--

INSERT INTO `eventBookings` (`eventBookingId`, `userId`, `eventTypeId`, `eventSessionId`, `ticketCount`, `ticketFee`, `totalPaidFee`, `status`, `transactionId`, `createdDate`, `updatedDate`) VALUES
(1, 7, 1, 7, 5, '20', '20', 'BOOKED', '1', NULL, NULL),
(2, 7, 1, 4, 4, '20', '20', 'BOOKED', '1', NULL, NULL),
(3, 7, 1, 4, 1, '10', '10', 'BOOKED', '1', NULL, NULL),
(4, 7, 1, 7, 5, '20', '20', 'BOOKED', '1', NULL, NULL),
(5, 7, 1, 7, 1, '10', '10', 'BOOKED', '1', NULL, NULL),
(6, 7, 1, 7, 1, '0', '0', 'BOOKED', '1', NULL, NULL),
(7, 7, 1, 7, 3, '0', '0', 'BOOKED', '1', NULL, NULL),
(8, 7, 1, 7, 3, '0', '0', 'BOOKED', '1', NULL, NULL),
(9, 7, 1, 7, 2, '0', '0', 'BOOKED', '1', NULL, NULL),
(10, 7, 1, 5, 2, '0', '0', 'BOOKED', '1', NULL, NULL),
(11, 7, 1, 4, 3, '0', '0', 'BOOKED', '1', NULL, NULL),
(12, 7, 1, 25, 2, '0', '0', 'BOOKED', '1', NULL, NULL),
(13, 7, 1, 7, 3, '0', '0', 'BOOKED', '1', NULL, NULL),
(14, 7, 1, 26, 2, '300', '300', 'BOOKED', '1', NULL, NULL),
(15, 7, 1, 26, 1, '200', '200', 'BOOKED', '1', NULL, NULL),
(16, 7, 1, 26, 1, '200', '200', 'BOOKED', '1', NULL, NULL),
(17, 7, 1, 27, 2, '300', '300', 'BOOKED', '1', NULL, NULL),
(18, 7, 1, 29, 2, '150', '150', 'BOOKED', '1', NULL, NULL),
(19, 7, 1, 26, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(20, 7, 1, 26, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(21, 7, 2, 33, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(22, 7, 3, 54, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(23, 7, 3, 54, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(24, 7, 3, 54, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(25, 7, 3, 54, 1, '50', '50', 'BOOKED', '1', NULL, NULL),
(26, 7, 3, 54, 1, '50', '50', 'BOOKED', '1', NULL, NULL),
(27, 7, 3, 54, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(28, 7, 3, 54, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(29, 7, 3, 54, 1, '50', '50', 'BOOKED', '1', NULL, NULL),
(30, 7, 1, 44, 2, '200', '200', 'BOOKED', '1', NULL, NULL),
(31, 7, 1, 44, 2, '200', '200', 'BOOKED', '1', NULL, NULL),
(32, 7, 3, 39, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(33, 7, 3, 39, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(34, 7, 3, 61, 1, '100', '100', 'BOOKED', '1', NULL, NULL),
(35, 7, 3, 62, 1, '50', '50', 'BOOKED', '1', NULL, NULL),
(36, 7, 1, 62, 2, '150', '150', 'BOOKED', '1', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `eventFee`
--

CREATE TABLE `eventFee` (
  `eventFeeId` int(11) NOT NULL,
  `eventSessionId` int(11) NOT NULL,
  `userTypeId` int(11) NOT NULL,
  `fee` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventFee`
--

INSERT INTO `eventFee` (`eventFeeId`, `eventSessionId`, `userTypeId`, `fee`, `createdDate`, `updatedDate`) VALUES
(1, 17, 1, '10', NULL, NULL),
(2, 17, 2, '20', NULL, NULL),
(3, 18, 1, '10', NULL, NULL),
(4, 18, 2, '20', NULL, NULL),
(5, 19, 1, '10', NULL, NULL),
(6, 19, 2, '20', NULL, NULL),
(7, 20, 1, '10', NULL, NULL),
(8, 20, 2, '20', NULL, NULL),
(9, 21, 1, '10', NULL, NULL),
(10, 21, 2, '20', NULL, NULL),
(11, 22, 1, '10', NULL, NULL),
(12, 22, 2, '20', NULL, NULL),
(13, 23, 1, '10', NULL, NULL),
(14, 23, 2, '20', NULL, NULL),
(15, 24, 1, '10', NULL, NULL),
(16, 24, 2, '20', NULL, NULL),
(17, 25, 1, '100', NULL, NULL),
(18, 25, 2, '200', NULL, NULL),
(19, 27, 1, '100', NULL, NULL),
(20, 27, 2, '200', NULL, NULL),
(21, 26, 1, '100', NULL, NULL),
(22, 26, 2, '200', NULL, NULL),
(23, 28, 1, '100', NULL, NULL),
(24, 28, 2, '200', NULL, NULL),
(25, 29, 1, '100', NULL, NULL),
(26, 29, 2, '50', NULL, NULL),
(27, 30, 1, '100', NULL, NULL),
(28, 30, 2, '50', NULL, NULL),
(29, 31, 1, '100', NULL, NULL),
(30, 31, 2, '50', NULL, NULL),
(31, 32, 1, '100', NULL, NULL),
(32, 32, 2, '50', NULL, NULL),
(33, 45, 1, '100', NULL, NULL),
(34, 45, 2, '100', NULL, NULL),
(35, 43, 1, '100', NULL, NULL),
(36, 43, 2, '100', NULL, NULL),
(37, 33, 1, '100', NULL, NULL),
(38, 33, 2, '100', NULL, NULL),
(39, 34, 1, '100', NULL, NULL),
(40, 34, 2, '100', NULL, NULL),
(41, 44, 1, '100', NULL, NULL),
(42, 44, 2, '100', NULL, NULL),
(43, 35, 1, '100', NULL, NULL),
(44, 35, 2, '100', NULL, NULL),
(45, 36, 1, '100', NULL, NULL),
(46, 36, 2, '100', NULL, NULL),
(47, 37, 1, '100', NULL, NULL),
(48, 37, 2, '100', NULL, NULL),
(49, 38, 1, '100', NULL, NULL),
(50, 38, 2, '100', NULL, NULL),
(51, 39, 1, '100', NULL, NULL),
(52, 39, 2, '100', NULL, NULL),
(53, 46, 1, '100', NULL, NULL),
(54, 46, 2, '100', NULL, NULL),
(55, 42, 1, '100', NULL, NULL),
(56, 42, 2, '100', NULL, NULL),
(57, 41, 1, '100', NULL, NULL),
(58, 41, 2, '100', NULL, NULL),
(59, 40, 1, '100', NULL, NULL),
(60, 40, 2, '100', NULL, NULL),
(61, 53, 1, '100', NULL, NULL),
(62, 53, 2, '50', NULL, NULL),
(63, 53, 3, '100', NULL, NULL),
(64, 53, 4, '200', NULL, NULL),
(65, 54, 1, '100', NULL, NULL),
(66, 54, 2, '50', NULL, NULL),
(67, 54, 3, '100', NULL, NULL),
(68, 54, 4, '200', NULL, NULL),
(69, 56, 1, '100', NULL, NULL),
(70, 56, 2, '50', NULL, NULL),
(71, 56, 3, '100', NULL, NULL),
(72, 56, 4, '200', NULL, NULL),
(73, 55, 1, '100', NULL, NULL),
(74, 55, 2, '50', NULL, NULL),
(75, 55, 3, '100', NULL, NULL),
(76, 55, 4, '200', NULL, NULL),
(77, 61, 1, '100', NULL, NULL),
(78, 61, 2, '50', NULL, NULL),
(79, 61, 3, '200', NULL, NULL),
(80, 61, 4, '100', NULL, NULL),
(81, 62, 1, '100', NULL, NULL),
(82, 62, 2, '50', NULL, NULL),
(83, 62, 3, '200', NULL, NULL),
(84, 62, 4, '100', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `eventParticipants`
--

CREATE TABLE `eventParticipants` (
  `eventParticipantId` int(11) NOT NULL,
  `eventBookingId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobileNumber` varchar(45) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `identity` varchar(45) DEFAULT NULL,
  `identityNumber` varchar(45) DEFAULT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isAttened` tinyint(1) DEFAULT NULL,
  `fees` varchar(45) DEFAULT NULL,
  `userTypeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventParticipants`
--

INSERT INTO `eventParticipants` (`eventParticipantId`, `eventBookingId`, `name`, `email`, `mobileNumber`, `address`, `identity`, `identityNumber`, `createdDate`, `updatedDate`, `isAttened`, `fees`, `userTypeId`) VALUES
(1, 2, 'hima', 'hima@gmail.com', '8341274720', 'guntur', 'votercard', '123', NULL, NULL, NULL, '20', 1),
(2, 2, 'hima', 'hima@gmail.com', '8341274720', 'guntur', 'votercard', '123', NULL, NULL, NULL, '20', 1),
(3, 2, 'hima', 'hima@gmail.com', '8341274720', 'guntur', 'votercard', '123', NULL, NULL, NULL, '20', 1),
(4, 5, 'Bindhu', 'tamma@gmail.com', '8474565230', '123,Guntur', 'Adhar', '927071351886', NULL, NULL, NULL, '10', 1),
(5, 14, 'Himabindhu', 'tammahimabindhu@gmail.com', '7586945689', '9-59', NULL, NULL, NULL, '2022-09-13 02:05:09', 1, '100', 1),
(6, 14, 'Sukhesh', 'ch.sukhesh@gmail.com', '8565745652', 'Guntur', NULL, NULL, NULL, '2022-09-13 02:12:02', 1, '200', 2),
(7, 15, 'abced', 'abcd@gmail.com', '775588669669', 'hyd', NULL, NULL, NULL, NULL, NULL, '200', 2),
(8, 16, 'abced', 'abcd@gmail.com', '775588669669', 'hyd', NULL, NULL, NULL, NULL, NULL, '200', 2),
(9, 17, 'xyz', 'xyz@gmail.com', '7585968596', 'Guntur', NULL, NULL, NULL, '2022-09-13 02:29:04', 0, '100', 1),
(10, 17, '123', '123@gmail.com', '748596456', 'Guntur', NULL, NULL, NULL, '2022-09-13 02:29:10', 1, '200', 2),
(11, 18, 'Test1', 'test1@gmail.com', '8345124520', 'Guntur', NULL, NULL, NULL, '2022-09-28 19:53:13', 1, '100', 1),
(12, 18, 'Test2', 'test2@gmail.com', '8475859662', 'Hyderabad', NULL, NULL, NULL, NULL, NULL, '50', 2),
(13, 20, 'stephen', 'stephen@gmail.com', '7858686896', '9-59,Nambur', NULL, NULL, NULL, NULL, NULL, '100', 1),
(14, 21, 'Himabindhu', 'himabindhu@kalitechnologies.com', '7485967485', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 1),
(15, 23, 'Himabindhu', 'tammahimabindhu@gmail.com', '8475758541', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 1),
(16, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(17, 26, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(18, 28, 'Himabindhu', 'tamma@gmail.com', '8596748596', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 1),
(19, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(20, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(21, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(22, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(23, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(24, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(25, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(26, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(27, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(28, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(29, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(30, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(31, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(32, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(33, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(34, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(35, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(36, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(37, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(38, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(39, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(40, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(41, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(42, 25, 'Himabindhu', 't@gmail.com', '8474758596', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(43, 30, 'Hima', 'hima@gmail.com', '8745858596', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 1),
(44, 30, 'bindhu', 'bindhu@gmail.com', '8474526352', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 2),
(45, 31, 'Hima', 'hima@gmail.com', '8745858596', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 1),
(46, 31, 'bindhu', 'bindhu@gmail.com', '8474526352', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 2),
(47, 33, 'sandy', 'sandy@gmail.com', '8341526352', '9-59', NULL, NULL, NULL, NULL, NULL, '100', 1),
(48, 35, 'Akul', 'akul@gmail.com', '8475859685', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2),
(49, 36, 'Ram', 'ram@gmail.com', '7896859685', 'Guntur', NULL, NULL, NULL, NULL, NULL, '100', 1),
(50, 36, 'Rahul', 'Rahul@gmail.com', '7456898954', 'Guntur', NULL, NULL, NULL, NULL, NULL, '50', 2);

-- --------------------------------------------------------

--
-- Table structure for table `eventSessions`
--

CREATE TABLE `eventSessions` (
  `eventSessionId` int(11) NOT NULL,
  `eventTypeId` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` varchar(45) NOT NULL,
  `dateTime` varchar(45) NOT NULL,
  `totalTickets` int(11) NOT NULL,
  `availableTickets` int(11) NOT NULL,
  `status` varchar(45) NOT NULL,
  `actionBy` int(11) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventSessions`
--

INSERT INTO `eventSessions` (`eventSessionId`, `eventTypeId`, `date`, `time`, `dateTime`, `totalTickets`, `availableTickets`, `status`, `actionBy`, `createdDate`, `updatedDate`) VALUES
(1, 1, '2022-09-05', '6:14PM', '2022-09-056:14PM', 10, 10, 'OPEN', 7, NULL, NULL),
(2, 1, '2022-09-06', '6:14PM', '2022-09-066:14PM', 10, 10, 'OPEN', 7, NULL, NULL),
(3, 1, '2022-09-05', '07:15AM', '2022-09-0507:15AM', 10, 10, 'OPEN', 7, NULL, NULL),
(4, 1, '2022-09-07', '6:14PM', '2022-09-076:14PM', 10, 10, 'OPEN', 7, NULL, NULL),
(5, 1, '2022-09-06', '07:15AM', '2022-09-0607:15AM', 10, 10, 'OPEN', 7, NULL, NULL),
(6, 1, '2022-09-07', '07:15AM', '2022-09-0707:15AM', 10, 10, 'OPEN', 7, NULL, NULL),
(7, 1, '2022-09-08', '6:14PM', '2022-09-086:14PM', 10, 10, 'OPEN', 7, NULL, NULL),
(8, 1, '2022-09-08', '07:15AM', '2022-09-0807:15AM', 10, 10, 'OPEN', 7, NULL, NULL),
(17, 1, '2022-09-05', '7:32PM', '2022-09-057:32PM', 5, 5, 'OPEN', 7, NULL, NULL),
(18, 1, '2022-09-05', '6:31PM', '2022-09-056:31PM', 5, 5, 'OPEN', 7, NULL, NULL),
(19, 1, '2022-09-06', '7:32PM', '2022-09-067:32PM', 5, 5, 'OPEN', 7, NULL, NULL),
(20, 1, '2022-09-06', '6:31PM', '2022-09-066:31PM', 5, 5, 'OPEN', 7, NULL, NULL),
(21, 1, '2022-09-07', '6:31PM', '2022-09-076:31PM', 5, 5, 'OPEN', 7, NULL, NULL),
(22, 1, '2022-09-07', '7:32PM', '2022-09-077:32PM', 5, 5, 'OPEN', 7, NULL, NULL),
(23, 1, '2022-09-08', '6:31PM', '2022-09-086:31PM', 5, 5, 'OPEN', 7, NULL, NULL),
(24, 1, '2022-09-08', '7:32PM', '2022-09-087:32PM', 5, 5, 'OPEN', 7, NULL, NULL),
(25, 1, '2022-09-13', '12:26PM', '2022-09-1312:26PM', 10, 10, 'OPEN', 7, NULL, NULL),
(26, 1, '2022-09-14', '12:26PM', '2022-09-1412:26PM', 10, 9, 'OPEN', 7, NULL, '2022-09-28 19:21:47'),
(27, 1, '2022-09-15', '12:26PM', '2022-09-1512:26PM', 10, 8, 'OPEN', 7, NULL, '2022-09-13 02:27:50'),
(28, 1, '2022-09-16', '12:26PM', '2022-09-1612:26PM', 10, 10, 'OPEN', 7, NULL, NULL),
(29, 1, '2022-09-17', '6:30PM', '2022-09-176:30PM', 2, 0, 'OPEN', 7, NULL, '2022-09-16 12:45:46'),
(30, 1, '2022-09-18', '6:30PM', '2022-09-186:30PM', 2, 2, 'OPEN', 7, NULL, NULL),
(31, 1, '2022-09-19', '6:30PM', '2022-09-196:30PM', 2, 2, 'OPEN', 7, NULL, NULL),
(32, 1, '2022-09-20', '6:30PM', '2022-09-206:30PM', 2, 2, 'OPEN', 7, NULL, NULL),
(33, 2, '2022-10-08', '7:30PM', '2022-10-087:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(34, 2, '2022-10-08', '6:30PM', '2022-10-086:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(35, 2, '2022-10-09', '6:30PM', '2022-10-096:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(36, 2, '2022-10-10', '7:30PM', '2022-10-107:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(37, 2, '2022-10-09', '7:30PM', '2022-10-097:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(38, 2, '2022-10-10', '6:30PM', '2022-10-106:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(39, 2, '2022-10-11', '6:30PM', '2022-10-116:30PM', 10, 9, 'OPEN', 7, NULL, '2022-10-31 12:24:10'),
(40, 2, '2022-10-11', '7:30PM', '2022-10-117:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(41, 2, '2022-10-12', '6:30PM', '2022-10-126:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(42, 2, '2022-10-12', '7:30PM', '2022-10-127:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(43, 2, '2022-10-13', '6:30PM', '2022-10-136:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(44, 2, '2022-10-14', '6:30PM', '2022-10-146:30PM', 10, 8, 'OPEN', 7, NULL, '2022-10-29 16:43:57'),
(45, 2, '2022-10-13', '7:30PM', '2022-10-137:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(46, 2, '2022-10-14', '7:30PM', '2022-10-147:30PM', 10, 10, 'OPEN', 7, NULL, NULL),
(47, 1, '2022-10-19', '06:00AM', '2022-10-1906:00AM', 10, 10, 'OPEN', 7, NULL, NULL),
(48, 1, '2022-10-24', '06:00AM', '2022-10-2406:00AM', 10, 10, 'OPEN', 7, NULL, NULL),
(49, 1, '2022-10-24', '6:00PM', '2022-10-246:00PM', 10, 10, 'OPEN', 7, NULL, NULL),
(50, 1, '2022-10-25', '06:00AM', '2022-10-2506:00AM', 10, 10, 'OPEN', 7, NULL, NULL),
(51, 1, '2022-10-25', '6:00PM', '2022-10-256:00PM', 10, 10, 'OPEN', 7, NULL, NULL),
(52, 1, '2022-10-26', '06:00AM', '2022-10-2606:00AM', 10, 10, 'OPEN', 7, NULL, NULL),
(53, 3, '2022-10-19', '6:00PM', '2022-10-196:00PM', 10, 10, 'OPEN', 7, NULL, NULL),
(54, 3, '2022-10-20', '6:00PM', '2022-10-206:00PM', 10, 7, 'OPEN', 7, NULL, '2022-10-20 13:46:22'),
(55, 3, '2022-10-21', '6:00PM', '2022-10-216:00PM', 10, 10, 'OPEN', 7, NULL, NULL),
(56, 3, '2022-10-22', '6:00PM', '2022-10-226:00PM', 10, 10, 'OPEN', 7, NULL, NULL),
(57, 1, '2022-12-15', '07:20AM', '2022-12-1507:20AM', 25, 25, 'OPEN', 7, NULL, NULL),
(58, 1, '2022-12-15', '6:20PM', '2022-12-156:20PM', 25, 25, 'OPEN', 7, NULL, NULL),
(59, 1, '2022-12-17', '07:20AM', '2022-12-1707:20AM', 25, 25, 'OPEN', 7, NULL, NULL),
(60, 1, '2022-12-16', '6:20PM', '2022-12-166:20PM', 25, 25, 'OPEN', 7, NULL, NULL),
(61, 3, '2022-12-15', '7:16PM', '2022-12-157:16PM', 10, 10, 'OPEN', 7, NULL, NULL),
(62, 3, '2022-12-16', '7:16PM', '2022-12-167:16PM', 10, 7, 'OPEN', 7, NULL, '2022-12-14 19:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `eventType`
--

CREATE TABLE `eventType` (
  `eventTypeId` int(11) NOT NULL,
  `eventType` varchar(45) NOT NULL,
  `actionBy` int(11) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `eventType`
--

INSERT INTO `eventType` (`eventTypeId`, `eventType`, `actionBy`, `createdDate`, `updatedDate`) VALUES
(1, 'Meditation', 7, NULL, '2022-10-12 11:35:27'),
(2, 'Wonder Health Experience', 7, NULL, NULL),
(3, 'Yoga', 7, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`roleId`, `roleName`, `createdDate`, `updatedDate`) VALUES
(1, 'USER', NULL, NULL),
(2, 'ADMIN', NULL, NULL),
(3, 'SUPER ADMIN', NULL, NULL),
(4, 'CUSTOMER', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `staticPages`
--

CREATE TABLE `staticPages` (
  `staticPageId` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `staticPages`
--

INSERT INTO `staticPages` (`staticPageId`, `name`, `content`, `createdDate`, `updatedDate`) VALUES
(1, 'Home', 'Banner', NULL, NULL),
(2, 'Home', 'Banner1', NULL, NULL),
(3, 'Home', '[object Object]', NULL, NULL),
(4, 'Home', '[object Object]', NULL, NULL),
(5, 'Home', '[object Object]', NULL, NULL),
(6, 'Home', '[object Object]', NULL, NULL),
(7, 'Home', 'Banner2', NULL, NULL),
(8, 'Home', 'Banner3', NULL, NULL),
(9, 'Home', '[object Object]', NULL, NULL),
(10, 'Home', '[object Object]', NULL, NULL),
(11, 'Home', '[object Object]', NULL, NULL),
(12, 'Home', '[object Object]', NULL, NULL),
(13, 'Home', '[object Object]', NULL, NULL),
(14, 'Home', '[object Object]', NULL, NULL),
(15, 'Home', '[object Object]', NULL, NULL),
(16, 'Home', '[object Object]', NULL, NULL),
(17, 'Home', '[object Object]', NULL, NULL),
(18, 'Home', '[object Object]', NULL, NULL),
(19, 'Home', '[object Object]', NULL, NULL),
(20, 'Home', 'Banner', NULL, NULL),
(21, 'Home', 'Banner', NULL, NULL),
(22, 'Home', 'Banner', NULL, NULL),
(23, 'Home', 'Banner', NULL, NULL),
(24, 'Home', '[object Object]', NULL, NULL),
(25, 'Home', '[object Object]', NULL, NULL),
(26, 'Home', '[object Object]', NULL, NULL),
(27, 'Home', '[object Object]', NULL, NULL),
(28, 'Home', '[object Object]', NULL, NULL),
(29, 'Home', '[object Object]', NULL, NULL),
(30, 'Home', '[object Object]', NULL, NULL),
(31, 'Home', 'mrudula bindhu', NULL, NULL),
(32, 'Home', '[object Object]', NULL, NULL),
(33, 'Home', '{\"heading\":\"sravanthi\"}', NULL, NULL),
(34, 'Home', '{\"heading\":\"godmust be grate\"}', NULL, NULL),
(35, 'Home', '[object Object]', NULL, '2022-06-27 11:02:08'),
(36, 'Home', '[{\"heading\":\"nvghfgxdshdjhvnh\"}]', NULL, NULL),
(37, 'Home', '[object Object]', NULL, NULL),
(38, 'Home', '[{\"heading\":\"subbumrudu\",\"subheading\":\"himabindhu\"}]', NULL, NULL),
(39, 'Home', '{\"heading\":\"hfgydgjnbmvm\",\"subheading\":\"bnvcbhjgsdgfchnxc\"}', NULL, NULL),
(40, 'Home', '{\"heading\":\"\",\"para\":\"\"}', NULL, NULL),
(41, 'Home', '{\"heading\":\"\"}', NULL, NULL),
(42, 'Home', '[{\"heading\":\"Heading1\",\"para\":\"Para1\"}]', NULL, NULL),
(43, 'Home', '[{\"heading\":\"\",\"para\":\"\"}]', NULL, NULL),
(44, 'Home', '[{\"heading\":\"\",\"para\":\"\"}]', NULL, NULL),
(45, 'Home', '[{\"heading\":\"Heading2\",\"para\":\"Para2\"}]', NULL, NULL),
(46, 'Home', '[{\"heading\":\"fsfag\",\"para\":\"sdfdgdfg\"},{\"heading\":\"dgfdg\",\"para\":\"dfgdfgdfg\"},{\"heading\":\"dfgdfgdfg\",\"para\":\"qw3w432ffsdfsdfer\"}]', NULL, NULL),
(47, 'Home', '[{\"heading\":\"Heading1\",\"para\":\"p1\"}]', NULL, NULL),
(48, 'Home', '[{\"heading\":\"Heading1\",\"para\":\"p1\"}]', NULL, NULL),
(49, 'Home', '[{\"heading\":\"Heading1\",\"para\":\"Para22\"}]', NULL, NULL),
(50, 'Home', '[]', NULL, NULL),
(51, 'Home', '[]', NULL, NULL),
(52, 'Howweare', '{\"whoweare\":\"How we are\",\"heading\":\"MEDICAL CENTER IN NEW YORK\",\"subheading\":\"We offer reasonable pricing health care plans, insurance packages to clients.\",\"para\":\"IBNSINO Medical Center provide patients with choices to ask for the conducting and analyzing of several lab tests on-site at no cost for prioritized patients or at 70% for people with an insurance.\"}', NULL, NULL),
(53, 'Cards', '{\"heading\":\"\",\"subheading\":\" See the Difference\",\"cardsList\":[{\"heading\":\"Patient-Centred\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"number\":\"01\"},{\"heading\":\"Comprehensive\",\"para\":\"We offer comprehensive health care focusing on the whole person, at all ages and stages of life\",\"number\":\"02\"},{\"heading\":\"New Technology\",\"para\":\"We have flexible hours and are open on certain evenings and during the weekend, to accommodate your schedule\",\"number\":\"03\"},{\"heading\":\"24 years experiens\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"number\":\"04\"}]}', NULL, NULL),
(54, 'Cards', '{\"heading\":\"\",\"subheading\":\"You can now book a limited amount of doctors appointments online\",\"cardsList\":[{\"heading\":\" Cured Patients\",\"para\":\"For over 15 years, we have delighted our customers and provide them with the necessary services\",\"number\":\"150K\"}]}', NULL, NULL),
(55, 'Cards', '{\"mainheading\":\"OUR REAL TESTIMONIALS\",\"cardsList\":[{\"para\":\"I am very impressed with you all as well as being bighly proficient is aabsoulutely adoreble. I feel so relaxed in her capable hands and hope to be her patient for a very  long time! You are a fantastic team and I feel very privileged to come to you all\",\"subheading\":\"Jonny Roberston\",\"smalltext\":\"Creative Manager of “KadirovGroup”\"}]}', NULL, NULL),
(56, 'Cards', '{\"heading\":\"\",\"cardsList\":[{\"heading\":\" Dr. Jon Jefferson\",\"para\":\"\\t Mon-Thu\\t08:00-20:00  \",\"name\":\"Ophtalmology\",\"para1\":\"Friday\\t07:00-22:00\",\"para2\":\"Saturday\\t08:00-18:00\"},{\"heading\":\"Dr. Jon Jefferson\",\"para\":\"Mon-Thu\\t08:00-20:00\",\"name\":\"Ophtalmology\",\"para1\":\"Friday\\t07:00-22:00 \",\"para2\":\"Saturday\\t08:00-18:00\"}]}', NULL, NULL),
(57, 'Cards', '{\"mainheading\":\"EMERGENCY CALL:\",\"emgno\":\"+123-12-456-77-89\",\"cardsList\":[{\"heading\":\"24 Hour Emergency\",\"para\":\"Open round the clock for conve-nience, quick and easy access\"},{\"heading\":\"Complate Lab Services\",\"para\":\"Cost-efficient, comprehensive and clinical laboratory services\"},{\"heading\":\"Medical Professionals\",\"para\":\"Qualified and certified physicians for qulity medical care\"}]}', NULL, NULL),
(58, 'Cards', '{\"heading\":\"\",\"cardsList\":[{\"heading\":\"How to create a website with Wordpress and Elementor\",\"para\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\"},{\"heading\":\"How to create a website with Wordpress and Elementor\",\"para\":\"Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\"}]}', NULL, NULL),
(59, 'Banner', '{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"profile\":\"\"}', NULL, '2022-07-19 21:16:09'),
(60, 'Cards', '[{\"heading\":\"CARDIOLOGY\",\"para\":\"All analyzes are carried out using modern equipment\"},{\"heading\":\"DENTAL\",\"para\":\"All analyzes are carried out using modern equipment\"},{\"heading\":\"OPHTHALMOLOGY\",\"para\":\"All analyzes are carried out using modern equipment\"},{\"heading\":\"DIAGNOSTICS\",\"para\":\"All analyzes are carried out using modern equipment\"}]', NULL, NULL),
(61, 'whoweare', '[{\"whoweare\":\"WHO WE ARE\",\"heading\":\"MEDICAL CENTER IN NEW YORK\",\"subheading\":\"We offer reasonable pricing health care plans, insurance packages to clients.\",\"para\":\"IBNSINO Medical Center provide patients with choices to ask for the conducting and analyzing of several lab tests on-site at no cost for prioritized patients or at 70% for people with an insurance.\"}]', NULL, NULL),
(62, 'whoweare', '[{\"whoweare\":\"WHO WE ARE\",\"heading\":\"MEDICAL CENTER IN NEW YORK\",\"subheading\":\"We offer reasonable pricing health care plans, insurance packages to clients.\",\"para\":\"IBNSINO Medical Center provide patients with choices to ask for the conducting and analyzing of several lab tests on-site at no cost for prioritized patients or at 70% for people with an insurance.\"}]', NULL, NULL),
(63, 'WhoWeAre', '[{\"whoweare\":\"Who We Are\",\"heading\":\" MULTIDISCIPLINARY MEDICAL CENTER IN NEW YORK123\",\"subheading\":\"We offer reasonable pricing health care plans, insurance packages to clients.123\",\"para\":\"IBNSINO Medical Center provide patients with choices to ask for the conducting and analyzing of several lab tests on-site at no cost for prioritized patients or at 70% for people with an insurance.1234562323\"}]', NULL, '2022-06-27 23:21:31'),
(64, 'WhoWeAre', '[{\"whoweare\":\"Hima Bindhu\",\"heading\":\"Mrudula\",\"subheading\":\"vghxcgzkfdlb hgfaghsjvk\",\"para\":\"ccbn mngfdsuyfscx vbnvn[hpfxv bcvnb.nnbvhgfudiglnm ,\"}]', NULL, NULL),
(65, 'Whychoouseus', '[{\"number\":\"-2\",\"heading\":\"Patient-Centred\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\"}]', NULL, '2022-06-29 12:13:49'),
(66, 'Whychoouseus', '{\"mainheading\":\"Why Choose Us\",\"subheading\":\"See the Difference\",\"cardsList\":[]}', NULL, NULL),
(67, 'Whychoouseus', '{\"mainheading\":\"fgfdg\",\"subheading\":\"See the Difference\",\"cardsList\":[]}', NULL, NULL),
(68, 'Whychoouseus', '{\"mainheading\":\"mainheading\",\"subheading\":\"See the Difference\",\"heading\":\"Patient-Centred34345\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life657567\"}', NULL, NULL),
(69, 'Whychoouseus', '{\"mainheading\":\"mainheading2\",\"subheading\":\"heading2\",\"heading\":\"24 years experiens5465\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life657567\"}', NULL, NULL),
(70, 'Whychoouseus', '{\"mainheading\":\"Mian heading222\",\"subheading\":\"See the Difference\",\"cardsList\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life445645645\"}', NULL, NULL),
(71, 'Whychoouseus', '{\"mainheading\":\"Main Heading11\",\"subheading\":\"See the Difference\",\"cardsList\":{\"\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own lifefgdgfgfg\"}}', NULL, NULL),
(72, 'Whychoouseus', '{\"mainheading\":\"Main Heading23\",\"subheading\":\"See the Difference\",\"cardsList\":[{\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life435345345\"}]}', NULL, NULL),
(73, 'Whychoouseus', '{\"mainheading\":\"dfsd\",\"subheading\":\"See the Difference\",\"cardsList\":[]}', NULL, NULL),
(74, 'Whychoouseus', '{\"mainheading\":\"dsfsdf\",\"subheading\":\"See the Difference\",\"cardsList\":[]}', NULL, NULL),
(75, 'Whychoouseus', '{\"mainheading\":\"fgfg\",\"subheading\":\"See the Difference\",\"cardsList\":[]}', NULL, NULL),
(76, 'Whychoouseus', '{\"mainheading\":\"fghfgh\",\"subheading\":\"ghf\",\"cardsList\":[]}', NULL, NULL),
(77, 'Whychoouseus', '{\"mainheading\":\"fhg\",\"subheading\":\"See the Difference\",\"cardsList\":[]}', NULL, NULL),
(78, 'Whychoouseus', '{\"mainheading\":\"heeading\",\"subheading\":\"See the Difference\",\"cardsList\":[{\"number\":\"1\",\"heading\":\"sdssf\",\"para\":\"ssjhfjhjf\"},{\"number\":\"2\",\"heading\":\"34\",\"para\":\"45\"}]}', NULL, NULL),
(79, 'WhoWeAre', '{\"mainheading\":\"MainHeading1\",\"subheading\":\"Heading1\",\"cardsList\":[]}', NULL, '2022-06-29 18:56:57'),
(80, 'choouseus', '{\"mainheading\":\"WHY CHOOSE US?1236\",\"subheading\":\"See the Difference databasar\",\"number\":\"01\",\"heading\":\"Patient-Centredfdrhgmn12345\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"number1\":\"02\",\"heading1\":\"Comprehensive123654\",\"para1\":\"We offer comprehensive health care focusing on the whole person, at all ages and stages of life\",\"number2\":\"03\",\"heading2\":\"New Technology12644\",\"para2\":\"We have flexible hours and are open on certain evenings and during the weekend, to accommodate your schedule\",\"number3\":\"04\",\"heading3\":\"24 years experiens12364\",\"para3\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\"}', NULL, '2022-06-29 13:31:07'),
(81, 'choouseus1', '{\"mainheading\":\"WHY CHOOSE US?\",\"subheading\":\"See the Difference\",\"number\":\"01\",\"heading\":\"Patient-Centred\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"number1\":\"02\",\"heading1\":\"Comprehensive\",\"para1\":\"We offer comprehensive health care focusing on the whole person, at all ages and stages of life\",\"number2\":\"03\",\"heading2\":\"New Technology\",\"para2\":\"We have flexible hours and are open on certain evenings and during the weekend, to accommodate your schedule\",\"number3\":\"04\",\"heading3\":\"24 years experiens\",\"para3\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\"}', NULL, '2022-06-30 14:53:59'),
(82, 'emg', '{\"mainheading\":\"EMERGENCY CALL:\",\"emgno\":\"+123-12-456-77-89\",\"heading\":\"24 Hour Emergency\",\"para\":\"Open round the clock for conve-nience, quick and easy access\",\"heading1\":\"Complate Lab Services\",\"para1\":\"Cost-efficient, comprehensive and clinical laboratory services\",\"heading2\":\"Medical Professionals\",\"para2\":\"Qualified and certified physicians for qulity medical care\"}', NULL, '2022-06-30 15:41:40'),
(83, 'est', '{\"mainheading\":\"OUR REAL TESTIMONIALS\",\"para\":\"I am very impressed with you all as well as being bighly proficient is aabsoulutely adoreble. I feel so relaxed in her capable hands and hope to be her patient for a verylong time! You are a fantastic team and I feel very privileged to come to you all\",\"subheading\":\"Jonny Roberston\",\"smalltext\":\"Creative Manager of “KadirovGroup”\"}', NULL, '2022-06-30 15:26:55'),
(84, 'Test', '{\"mainheading\":\"OUR REAL TESTIMONIALS\",\"para\":\"I am very impressed with you all as well as being bighly proficient is aabsoulutely  adoreble. I feel so relaxed in her capable hands and hope to be her patient for a very long time! You are a fantastic team and I feel very privileged to come to you all.\",\"subheading\":\"Jonny Roberston.\",\"smalltext\":\"Creative Manager of “KadirovGroup”.\"}', NULL, '2022-06-30 15:31:13'),
(85, 'cont', '{\"mainheading1\":\"YOGA\",\"mainpara\":\"The science and practice of yoga has its origin thousands of years ago, with the very dawn of civilization, long before any religions or belief systems were born. Yoga is a spiritual discipline based on a profound and subtle science, which focuses on the balance between mind, body and soul. An art and science of healthy living, Yoga is about harmonizing oneself with the universe. It is the practice and training of aligning individual geometry with the cosmic, to achieve the highest level of perception and harmony. One who practices yoga with involvement can reap its benefits, irrespective of one’s faith, ethnicity or culture.\",\"subheading\":\"Preventive   Yoga    Care:\",\"parap\":\"Yoga is not just a form of physical exercise or doing pretzel poses only. It’s not just a few breathing techniques. It’s not just a philosophy or art. It is a complete path by itself. A path that takes you to the existence of yours. It aims at taking you from something that you know towards the unknown. It is not a work-out; it is a work-in. It is something that brings you inwards.\",\"parap1\":\"Periodontal Scaling / Deep Cleanig\",\"parap2\":\"Yoga helps with back pain relief\",\"parap3\":\"Our perspective of existence simply has four dimensions to it- mind, body, emotions and energy. Whatever we plan to do, we do at these four levels. But the overall well-being comes with managing all these four dimensions effectively. When all these four elements are in perfect harmony, one can attain blissfulness or can be at ease or at peace.\",\"subpara\":\"‘Yoga’ aims at achieving that bliss. The word ‘Yoga’ is derived from the Sanskrit language, which means union. Union as in it works to bring the transformative change at all these four levels and bring the body as a whole to a relaxed state. It encourages the union of individual consciousness with the universal consciousness. Thereby enabling you to be healthy at physical and mental levels.\"}', NULL, '2022-07-21 01:41:01'),
(86, 'choose', '{\"mainheading\":\"Main Heading1\",\"subheading\":\"Heading1\",\"cardsList\":[]}', NULL, '2022-06-29 19:12:49'),
(87, 'choose', '{\"mainheading\":\"Main Heading1\",\"subheading\":\"Heading1\",\"cardsList\":[{\"heading\":\"Heading1\",\"para\":\"p1\"}]}', NULL, NULL),
(88, 'choose', '{\"mainheading\":\"Main Heading11\",\"subheading\":\"Heading1\",\"cardsList\":[{\"heading\":\"Heading1\",\"para\":\"p1\"},{\"heading\":\"Heading1\",\"para\":\"p2\"}]}', NULL, NULL),
(89, 'choose1', '{\"mainheading\":\"Mian heading222\",\"subheading\":\"Heading1\",\"cardsList\":[]}', NULL, '2022-06-29 20:05:44'),
(90, 'ser', '{\"mainheading\":\"Services and Prices:\",\"heading1\":\"Wonder Health Experience Fee Per Person\",\"name\":\"Senior citizen fee\",\"para\":\"adult fee\",\"para1\":\"youth fee\",\"para2\":\"chilgren fee\",\"heading2\":\"\",\"para3\":\"Student group fee\",\"para4\":\"teacher by an educational instuitution fee\"}', NULL, '2022-06-29 20:17:15'),
(91, 'ser', '{\"mainheading\":\"Services and Prices:\",\"heading1\":\"Student group fee\",\"name\":\"500\",\"para\":\"500\",\"para1\":\"800\",\"para2\":\"600\",\"heading2\":\"\",\"para3\":\"500\",\"para4\":\"600\"}', NULL, NULL),
(92, 'service', '{\"mainheading\":\"Services and Prices:\",\"heading1\":\"Wonder Health Experience Fee Per Person\",\"name\":\"Senior Citizens : above 60 Years \",\"price\":\"Rs.100\",\"para\":\"Adults : 18 to 60 Years \",\"price1\":\"Rs.200\",\"para1\":\"Youth : 12 to 18 Years \",\"price2\":\"Rs.100\",\"para2\":\"Children : Below 12 Years\",\"price3\":\" Rs.50\",\"heading2\":\"Student Group Fee\",\"para3\":\"Student Groups (with ID Cards) Per Student \",\"price4\":\"Rs.50\",\"para4\":\"Teacher\'s by an Educational Institution \",\"price5\":\"Rs.50\"}', NULL, '2022-10-19 11:54:09'),
(93, 'cho', '{\"mainheading\":\"m1\",\"subheading\":\"Heading1\",\"cardsList\":[]}', NULL, '2022-06-29 23:08:52'),
(94, 'banner', '{\"heading\":\"YOGA\"}', NULL, NULL),
(95, 'bannerdata', '{\"heading\":\"YOGA\",\"profile\":{\"name\":\"download_1_256x256_crop_center.webp\",\"size\":14406,\"source\":\"blob:http://localhost:3000/7e519af1-c90b-4309-ba7e-2dbe25a035c8\",\"file\":{}}}', NULL, '2022-07-02 10:13:14'),
(96, 'cho', '{\"mainheading\":\"Mian heading222\",\"subheading\":\"Heading1\",\"cardsList\":[{\"heading\":\"ghgh\",\"para\":\"sdgdfgdfg\"},{\"heading\":\"dfsdfsd\",\"para\":\"sdfsdfsdfsfd\"},{\"heading\":\"dsfsdf\",\"para\":\"dsfsdfgdfgdfg\"}]}', NULL, NULL),
(97, 'cho1', '{\"mainheading\":\"sdfsdf\",\"subheading\":\"Heading1\",\"cardsList\":[]}', NULL, '2022-06-29 23:32:55'),
(98, 'mbannerdata', '{\"heading\":\"MEDITATION \",\"profile\":{\"name\":\"coffee-beans-couple-wallpaper-preview.jpg\",\"size\":30538,\"source\":\"blob:http://localhost:3000/86b36afe-bd0a-4df0-8d3b-d7507908d2d1\",\"file\":{}}}', NULL, '2022-07-02 07:38:41'),
(99, 'mcont', '{\"mainheading1\":\"MEDITATION\",\"mainpara\":\"Meditation is the practice of focused concentration inorder to achieve a state of deep calmness, inner harmony and bliss. The popularity of meditation is increasing as more and more people are discovering its many health benefits each day. It is a great means to learn how to increase awareness of yourself and your surroundings. Meditation isn\'t about becoming a different person or a new person. It\'s about bettering your mental and physical state by training in awareness and getting a healthy sense of perspective.  An ancient tradition born out of India, Meditation is practiced in cultures all over the world\",\"subheading\":\"What is Meditation?\",\"parap\":\"Today, meditating daily is not a luxury but a necessity. To be unconditionally happy and to have peace of mind, we need to tap into the power of meditation. The purpose of meditation is to make one calm, stress-free, free from pain, healthy and happy. Meditation helps in maintaining good physical health, mental health & emotional health.\",\"parap1\":\"Today, meditating daily is not a luxury but a necessity. To be unconditionally happy and to have peace of mind, we need to tap into the power of meditation. The purpose of meditation is to make one calm, stress-free, free from pain, healthy and happy. Meditation helps in maintaining good physical health, mental health & emotional health.\",\"parap2\":\"The advantages of preventive mediation include saving time and money, protecting the privacy of the parties, and empowering the parties to solve their problems without engaging in potentially destructive litigation. However, the most important advantage is relationship preservation.\",\"parap3\":\"Meditation is the habitual process of training your mind to focus and redirect your thoughts.\",\"subpara\":\"The benefits of meditation are manifold - a calm mind, focussed attention, good concentration power, clarity of thoughts and feelings, balanced emotions in stressful situations, improved communication skills, the birth of new skills and talents, unshakeable inner strength, healing powers, ability to connect to an inner source of energy, relaxation, rejuvenation, and even the ability to attract good luck! These are all the natural effects of regular meditation practice.\"}', NULL, '2022-07-21 01:58:32'),
(100, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, '2022-06-29 23:41:24'),
(101, 'mservice', '{\"mainheading\":\"Services and Prices:\",\"heading1\":\"Wonder Health Experience Fee Per Person\",\"name\":\"Senior Citizens : above 60 Years     \",\"price\":\"Rs.100\",\"para\":\"Adults : 18 to 60 Years\",\"price1\":\"Rs.200\",\"para1\":\"Youth : 12 to 18 Years \",\"price2\":\"Rs.100\",\"para2\":\"Children : Below 12 Years\",\"price3\":\"Rs.50\",\"heading2\":\"Student Group Fee \",\"para3\":\"Student Groups (with ID Cards) Per Student \",\"price4\":\" Rs.50 \",\"para4\":\"Teacher\'s by an Educational Institution \",\"price5\":\"Rs.50\"}', NULL, '2022-10-19 11:58:10'),
(102, 'dbannerdata', '{\"heading\":\"DEPARTMENTS page\"}', NULL, '2022-06-29 23:47:54'),
(103, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, '2022-06-29 23:50:54'),
(104, 'dcont', '{\"mainheading\":\"OUR SPECIALISTS data\",\"mainpara\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\",\"subheading\":\"Jonny Roberston\",\"para\":\"Dental care for pregnant patients cosists on evaluation and cleaning, mainly, to educate patients on oral health care and pregnancy\",\"para1\":\"Restorative Dentistry - Amalgan / Composite Fillings\",\"para2\":\"Oral Exam / Radiograph Study\",\"para3\":\"Periodontal Scaling / Deep Cleanig\",\"subpara\":\"Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.\"}', NULL, '2022-06-29 23:50:51'),
(105, 'dservice', '{\"mainheading\":\"ONLINE APPOINTMENTS AND PRESCRIPTIONS123\",\"heading1\":\"Wonder Health Experience Fee Per Person123\",\"name\":\"business\",\"para\":\"adult\",\"para1\":\"youth\",\"para2\":\"children\",\"heading2\":\"Student group fee123\",\"para3\":\"student\",\"para4\":\"teacher123\"}', NULL, '2022-06-29 23:53:20'),
(106, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, '2022-06-30 00:02:25'),
(107, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, '2022-06-30 00:29:06'),
(108, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, '2022-06-30 00:35:45'),
(109, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardList\":[{}]}', NULL, '2022-06-30 16:59:47'),
(110, 'WhoWeAreData', '[{\"whoweare\":\"Who We Are\",\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"Sri Shivaratnapuri Temple of Health,\\n a Tri-Pyramidal Abode of Well-being and\\n a Unit of Sri Rajarajeshwari Charitable Hospital\\n Trust is founded by His Holiness Parama\\n Pujya Srimat Paramahamsa Parivrajakacharya\\n Sachidananda Pranavaswarupa\\n Paramacharya Jagadguru\\n Sri Sri Sri Shivaratnapuri Bhagawatpadacharya\\n Sri Sri Sri Tiruchi Mahaswamigal.\\n It is envisioned to reality by\\n His Holiness Parama Pujya Srimatparamahamsa\\n Parivrajakacharya Sachidananda Pranavaswarupa\\n Acharya Mahamandaleshwar Jagadguru\\n Sri Sri Sri Jayendra Puri Mahaswamiji,\\n and is located in Rajarajeshwarinagar,\\n Bengaluru 560098\"}]', NULL, NULL),
(111, 'WhoWeAreData1', '{\"whoweare\":\"WHO WE ARE \",\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"Sri Shivaratnapuri Temple of Health,\\n a Tri-Pyramidal Abode of Well-being and\\n a Unit of Sri Rajarajeshwari Charitable Hospital\\n Trust is founded by His Holiness Parama\\n Pujya Srimat Paramahamsa Parivrajakacharya\\n Sachidananda Pranavaswarupa\\n Paramacharya Jagadguru\\n Sri Sri Sri Shivaratnapuri Bhagawatpadacharya\\n Sri Sri Sri Tiruchi Mahaswamigal.\\n It is envisioned to reality by\\n His Holiness Parama Pujya Srimatparamahamsa\\n Parivrajakacharya Sachidananda Pranavaswarupa\\n Acharya Mahamandaleshwar Jagadguru\\n Sri Sri Sri Jayendra Puri Mahaswamiji,\\n and is located in Rajarajeshwarinagar,\\n Bengaluru 560098.\"}', NULL, '2022-06-30 15:02:29'),
(112, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, NULL),
(113, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardsList\":[]}', NULL, NULL),
(114, 'cho2', '{\"mainheading\":\"fdgdfg\",\"subheading\":\"fgdfg\",\"cardList\":[{\"key\":{\"heading\":\"Heading1\",\"para\":\"p1\"}}]}', NULL, '2022-06-30 17:16:07'),
(115, 'abannerdata', '{\"heading\":\"ABOUT US\"}', NULL, '2022-07-01 06:41:34'),
(116, 'abannerdata', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(117, 'abannerdata', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(118, 'abannerdata', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(119, 'abannerdata1', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(120, 'abannerdata1', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(121, 'abannerdata1', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(122, 'bannerdata1', '{\"heading\":\"ABOUT US\",\"profile\":{\"name\":\"content-img-02.jpg\",\"size\":174365,\"source\":\"blob:http://localhost:3000/6e908c0a-fdaa-45a8-8e72-8ea69525e35e\",\"file\":{}}}', NULL, '2022-07-02 10:18:23'),
(123, 'aboutdata1', '{\"whoweare\":\"WHO WE ARE\",\"mainheading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\" a Tri-Pyramidal Abode of Well-being and a Unit of Sri Rajarajeshwari Charitable Hospital Trust is founded by HisHoliness Parama Pujya Srimat Paramahamsa Parivrajakacharya Sachidananda Pranavaswarupa Paramacharya Jagadguru.\",\"subheading\":\"Sri Sri Sri Shivaratnapuri Bhagawatpadacharya Sri Sri Sri Tiruchi Mahaswamigal.\",\"para1\":\" It is envisioned to reality by His Holiness Parama Pujya Srimatparamahamsa Parivrajakacharya Sachidananda Pranavaswarupa Acharya Mahamandaleshwar Jagadguru Sri Sri Sri Jayendra Puri Mahaswamiji, and is located in   Rajarajeshwarinagar, Bengaluru 560098.\",\"para2\":\" It is the first hospital day care centre in the world in the form of a pyramid, offering multiple systems of medicine and therapy under one roof structure with the sole motto ‘Freedom from Medication’.\",\"para3\":\" Research has proven that pyramids are extraordinary energy  centers. The Three Pyramids which form the Sri Shivaratnapuri Temple of Health are constructed under the guidance of His Holiness to the last detail. The length of the sides of the base  of the Big Pyramid in this complex is exactly 1/5 th of the  length of the sides of the base of the Great Pyramid of Egypt at Giza.\",\"para4\":\"The very unique and unprecedented feature of this construction is that no metal reinforcement at all has been used for the strength of the edifice. The non-metallic nature of this Pyramid fosters better retaining of Cosmic Energy.\",\"para5\":\" Further, it is a stand-alone pyramid on the roof slab of the basement that has parking spaces for one hundred four-wheelers and two hundred two-wheelers.\",\"para6\":\"There are three pyramids in the complex, two Small and one Big. Among the two small pyramids one serves as a children’s play area and the other is a free dispensary. The Big Pyramid houses a seven storied stepped pyramid within.\"}', NULL, '2022-07-01 07:20:39'),
(124, 'bannerdata1', '{\"heading\":\"ABOUT US\"}', NULL, NULL),
(125, 'bannerdata1', '{\"heading\":\"YOGA\",\"profile\":{\"name\":\"content-img-02.jpg\",\"size\":174365,\"source\":\"blob:http://localhost:3000/b33404a1-d731-4650-860f-fb993ac87e9b\",\"file\":{}}}', NULL, NULL),
(126, 'bannerdata', '{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"profile\":\"\"}', NULL, NULL),
(127, 'bannerdata', '{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"profile\":\"\"}', NULL, NULL),
(128, 'bannerh', '{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"profile\":\"\"}', NULL, NULL),
(129, 'Cards', '[{\"heading\":\"YOGA\",\"para\":\"data\"}]', NULL, NULL),
(130, 'BannerCards', '[{\"heading\":\"YOGA\",\"para\":\"data\"},{\"heading\":\"MEDITATION \",\"para\":\"data\"}]', NULL, NULL),
(131, 'BannerCards1', '[{\"heading\":\"YOGA\"},{\"heading\":\"YOGA\"},{\"heading\":\"MEDITATION \"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(132, 'BannerCard', '[{\"heading\":\"YOGA\"},{\"heading\":\"MEDITATION \"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(133, 'BannerCard', '[{\"heading\":\"YOGA\"},{\"heading\":\"MEDITATION \"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(134, 'BannerCard', '[{\"heading\":\"YOGA123\"},{\"heading\":\"MEDITATION 123\"},{\"heading\":\"EVENT123\"}]', NULL, NULL),
(135, 'BannerCard', '[{\"heading\":\"YOGA123456\"},{\"heading\":\"MEDITATION \"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(136, 'BannerCard', '[{\"heading\":\"YOGA123456\"},{\"heading\":\"MEDITATION \"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(137, 'Banner_Card', '[{\"heading\":\"YOGA123456\"},{\"heading\":\"MEDITATION\"},{\"heading\":\"EVENT\"}]', NULL, '2022-07-19 10:42:15'),
(138, 'Banner_Card', '[{\"heading\":\"YOGA123456\"},{\"heading\":\"MEDITATION 365\"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(139, 'Banner_Card', '[{\"heading\":\"YOGA\"},{\"heading\":\"MEDITATION\"},{\"heading\":\"EVENT\"}]', NULL, NULL),
(140, 'Banner-Card', '[{\"heading\":\"YOGA1232334234\"},{\"heading\":\"MEDITATION 345546456\"}]', NULL, '2022-07-19 11:46:43'),
(141, 'bannercard', '[{\"heading\":\"Heading11323\"},{\"heading\":\"Helloo.123\"},{\"heading\":\"Heading212313\"}]', NULL, '2022-07-19 11:59:10'),
(142, 'banner-card', '[{\"heading\":\"YOGA \"},{\"heading\":\"MEDITATION\"},{\"heading\":\"EVENTS\"}]', NULL, '2022-07-19 12:18:14'),
(143, 'doctors', '{\"heading\":\"\",\"cardsList\":[{\"heading\":\"YOGA\",\"para\":\"123\",\"name\":\"business\",\"para1\":\"123\",\"para2\":\"123\"},{\"heading\":\"ABOUT US\",\"para\":\"123\",\"name\":\"1223\",\"para1\":\"123\",\"para2\":\"1236\"},{\"heading\":\"dfrg\",\"para\":\"123\",\"name\":\"12345\",\"para1\":\"123\",\"para2\":\"123\"}]}', NULL, NULL),
(144, 'doctorsdata', '{\"mainheading\":\"OUR SPECIALISTS \",\"cardsList\":[{\"heading\":\"YOGA12123\",\"para\":\"12312345\",\"name\":\"business\",\"para1\":\"365\",\"para2\":\"12365\"},{\"heading\":\"naga12345\",\"para\":\"2365\",\"name\":\"naga12345\",\"para1\":\"12365\",\"para2\":\"123654\"},{\"heading\":\"Patient-Centred\",\"para\":\"123654\",\"name\":\"12365\",\"para1\":\"123654\",\"para2\":\"123654\"},{\"heading\":\"24 Hour Emergency\",\"para\":\"1478\",\"name\":\"12365\",\"para1\":\"16\",\"para2\":\"12365\"}]}', NULL, '2022-07-19 21:02:14'),
(145, 'doctorsdata', '{\"mainheading\":\"OUR SPECIALISTS\",\"cardsList\":[{\"heading\":\"YOGA\",\"para\":\"123\",\"name\":\"business\",\"para1\":\"365\",\"para2\":\"12365\"},{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"2365\",\"name\":\"naga\",\"para1\":\"12365\",\"para2\":\"123654\"},{\"heading\":\"Patient-Centred\",\"para\":\"123654\",\"name\":\"12365\",\"para1\":\"123654\",\"para2\":\"123654\"},{\"heading\":\"24 Hour Emergency\",\"para\":\"1478\",\"name\":\"12365\",\"para1\":\"16\",\"para2\":\"12365\"}]}', NULL, NULL),
(146, 'latestnews', '{\"mainheading\":\"\",\"cardsList\":[{\"heading\":\"YOGA\",\"para\":\"database\"},{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"ddssawerty\"},{\"heading\":\"24 Hour Emergency\",\"para\":\"vfrtydsag\"},{\"heading\":\"hgfds\",\"para\":\"mnvcsdertyuiok\"}]}', NULL, NULL),
(147, 'latestnew', '{\"mainheading\":\"WHY CHOOSE US\",\"cardsList\":[]}', NULL, '2022-07-19 20:56:48'),
(148, 'latestnew1', '{\"mainheading\":\"WHY CHOOSE US\",\"cardsList\":[{\"heading\":\"YOGA\",\"para\":\"data\"},{\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"about us\"},{\"heading\":\"Patient-Centred\",\"para\":\"data base\"},{\"heading\":\"24 Hour Emergency\",\"para\":\"save\"}]}', NULL, '2022-07-19 21:10:33'),
(149, 'NewBanner', '{\"heading\":\"Banner1\",\"profilePath\":\"1658293735376160687bannerlogo.jpg\"}', NULL, NULL),
(150, 'NewBanner', '{\"heading\":\"\",\"profilePath\":\"1658295508740626330bannerlogo.jpg\"}', NULL, NULL),
(151, 'NewBanner', '{\"heading\":\"\",\"profilePath\":\"1658295726778785931bannerlogo.jpg\"}', NULL, NULL),
(152, 'New-Banner', '{\"heading\":\"\",\"profilePath\":\"1658298159840570228bannerlogo.jpg\"}', NULL, NULL),
(153, 'New-Banner', '{\"heading\":\"\",\"profilePath\":\"1658302327224361366bannerlogo.jpg\"}', NULL, NULL),
(154, 'New-Banner', '{\"heading\":\"\",\"profilePath\":\"1658313466972636671bannerlogo.jpg\"}', NULL, NULL),
(155, 'New-Banner1', '{\"heading\":\"Sri Shivanthapur Temple of Health\",\"profilePath\":\"1658323012848488160bannerlogo.jpg\"}', NULL, '2022-07-20 18:46:53'),
(156, 'New-Banner1', '{\"heading\":\"Sri Shivanthapur Temple of Health\",\"profilePath\":\"1658315643780359087bannerlogo.jpg\"}', NULL, NULL),
(157, 'New-Banner2', '{\"heading\":\"Sri Shivanthapur Temple of Health\",\"profilePath\":\"1671021544507199952bannerlogo.jpg\"}', NULL, '2022-12-14 18:09:04'),
(158, 'WhoWeAreData2', '{\"whoweare\":\"WHO WE ARE\",\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"Sri Shivaratnapuri Temple of Health, a Tri-Pyramidal Abode of Well-being and a Unit of Sri Rajarajeshwari Charitable Hospital Trust is founded by His Holiness Parama Pujya Srimat Paramahamsa Parivrajakacharya Sachidananda Pranavaswarupa Paramacharya Jagadguru Sri Sri Sri Shivaratnapuri Bhagawatpadacharya Sri Sri Sri Tiruchi Mahaswamigal. It is envisioned to reality by His Holiness Parama Pujya Srimatparamahamsa Parivrajakacharya Sachidananda Pranavaswarupa Acharya Mahamandaleshwar Jagadguru Sri Sri Sri Jayendra Puri Mahaswamiji, and is located in Rajarajeshwarinagar, Bengaluru 560098.\",\"profilePath\":\"1671022101490488661bannerlogo.jpg\"}', NULL, '2022-12-14 18:18:21'),
(159, 'WhoWeAreData2', '{\"whoweare\":\"WHO WE ARE\",\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"Sri Shivaratnapuri Temple of Health, a Tri-Pyramidal Abode of Well-being and a Unit of Sri Rajarajeshwari Charitable Hospital Trust is founded by His Holiness Parama Pujya Srimat Paramahamsa Parivrajakacharya Sachidananda Pranavaswarupa Paramacharya Jagadguru Sri Sri Sri Shivaratnapuri Bhagawatpadacharya Sri Sri Sri Tiruchi Mahaswamigal. It is envisioned to reality by His Holiness Parama Pujya Srimatparamahamsa Parivrajakacharya Sachidananda Pranavaswarupa Acharya Mahamandaleshwar Jagadguru Sri Sri Sri Jayendra Puri Mahaswamiji, and is located in Rajarajeshwarinagar, Bengaluru 560098.\",\"profilePath\":\"1658330836389501651bannerlogo.jpg\"}', NULL, NULL),
(160, 'WhoWeAreData2', '{\"whoweare\":\"WHO WE ARE\",\"heading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"Sri Shivaratnapuri Temple of Health, a Tri-Pyramidal Abode of Well-being and a Unit of Sri Rajarajeshwari Charitable Hospital Trust is founded by His Holiness Parama Pujya Srimat Paramahamsa Parivrajakacharya Sachidananda Pranavaswarupa Paramacharya Jagadguru Sri Sri Sri Shivaratnapuri Bhagawatpadacharya Sri Sri Sri Tiruchi Mahaswamigal. It is envisioned to reality by His Holiness Parama Pujya Srimatparamahamsa Parivrajakacharya Sachidananda Pranavaswarupa Acharya Mahamandaleshwar Jagadguru Sri Sri Sri Jayendra Puri Mahaswamiji, and is located in Rajarajeshwarinagar, Bengaluru 560098.\",\"profilePath\":\"1658330842200362405bannerlogo.jpg\"}', NULL, NULL),
(161, 'choouseus2', '{\"mainheading\":\"WHY CHOOSE US?\",\"subheading\":\"See the Difference\",\"number\":\"01\",\"heading\":\"Patient-Centred\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"number1\":\"02\",\"heading1\":\"Comprehensive\",\"para1\":\"We offer comprehensive health care focusing on the whole person, at all ages and stages of life\",\"number2\":\"03\",\"heading2\":\"New Technology\",\"para2\":\"We have flexible hours and are open on certain evenings and during the weekend, to accommodate your schedule\",\"number3\":\"04\",\"heading3\":\"24 years experiens\",\"para3\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"profilePath\":\"1664369847390942200bannerlogo.jpg\"}', NULL, '2022-09-28 18:27:27'),
(162, 'choouseus2', '{\"mainheading\":\"WHY CHOOSE US?\",\"subheading\":\"See the Difference\",\"number\":\"01\",\"heading\":\"Patient-Centred\",\"para\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"number1\":\"02\",\"heading1\":\"Comprehensive\",\"para1\":\"We offer comprehensive health care focusing on the whole person, at all ages and stages of life\",\"number2\":\"03\",\"heading2\":\"New Technology\",\"para2\":\"We have flexible hours and are open on certain evenings and during the weekend, to accommodate your schedule\",\"number3\":\"04\",\"heading3\":\"24 years experiens\",\"para3\":\"While our team brings important experience and knowledge, we know that each patient is the expert in their own life\",\"profilePath\":\"1658337473809629215bannerlogo.jpg\"}', NULL, NULL),
(163, 'Test1', '{\"mainheading\":\"OUR REAL TESTIMONIALS\",\"para\":\"I am very impressed with you all as well as being bighly proficient is aabsoulutely  adoreble. I feel so relaxed in her capable hands and hope to be her patient for a very long time! You are a fantastic team and I feel very privileged to come to you all.\",\"subheading\":\"Jonny Roberston\",\"smalltext\":\"Creative Manager of “KadirovGroup”.\",\"profilePath\":\"1664369869462661952bannerlogo.jpg\"}', NULL, '2022-09-28 18:27:49'),
(164, 'emg1', '{\"mainheading\":\"EMERGENCY CALL:\",\"emgno\":\"+123-12-456-77-89\",\"heading\":\"24 Hour Emergency\",\"para\":\"Open round the clock for conve-nience, quick and easy access\",\"heading1\":\"Complate Lab Services\",\"para1\":\"Cost-efficient, comprehensive and clinical laboratory services\",\"heading2\":\"Medical Professionals\",\"para2\":\"Qualified and certified physicians for qulity medical care\",\"emergency\":\"1658387578782440679bannerlogo.jpg\",\"services\":\"1658387578782733093bannerlogo.jpg\",\"professionals\":\"1658387579206105997bannerlogo.jpg\",\"profilePath\":\"1658387577246000110bannerlogo.jpg\"}', NULL, '2022-07-21 12:42:57'),
(165, 'bannercardone', '[{\"heading\":\"Heading1\",\"profilePath\":\"1658403993586124206bannerlogo.jpg\"},{\"heading\":\"Heading2\",\"profilePath\":\"1658404028040841323bannerlogo.jpg\"},{\"heading\":\"fsfag\",\"profilePath\":\"1658404042966285129bannerlogo.jpg\"}]', NULL, '2022-07-21 17:29:32'),
(166, 'YNew-Banner2', '{\"heading\":\"Managing Technology\",\"profilePath\":\"1668084345442846868bannerlogo.jpg\"}', NULL, '2022-11-10 18:15:44'),
(167, 'YNew-Banner2', '{\"heading\":\"YOGA\",\"profilePath\":\"1658346871990308638bannerlogo.jpg\"}', NULL, NULL),
(168, 'mNew-Banner2', '{\"heading\":\"MEDITATION \",\"profilePath\":\"1664372073542268425bannerlogo.jpg\"}', NULL, '2022-09-28 19:04:33'),
(169, 'UNew-Banner2', '{\"heading\":\"ABOUT US\",\"profilePath\":\"1664372140105726677bannerlogo.jpg\"}', NULL, '2022-09-28 19:05:40'),
(170, 'AWhoWeAreData2', '{\"whoweare\":\"WHO WE ARE\",\"mainheading\":\"SRI SHIVARATNAPURI TEMPLE OF HEALTH\",\"para\":\"A Tri-Pyramidal Abode of Well-being and a Unit of Sri Rajarajeshwari Charitable Hospital Trust is founded by HisHoliness Parama Pujya Srimat Paramahamsa Parivrajakacharya Sachidananda Pranavaswarupa Paramacharya Jagadguru.\",\"subheading\":\"Sri Sri Sri Shivaratnapuri Bhagawatpadacharya Sri Sri Sri Tiruchi Mahaswamigal.\",\"para1\":\"It is envisioned to reality by His Holiness Parama Pujya Srimatparamahamsa Parivrajakacharya Sachidananda Pranavaswarupa Acharya Mahamandaleshwar Jagadguru Sri Sri Sri Jayendra Puri Mahaswamiji, and is located in Rajarajeshwarinagar, Bengaluru 560098.\",\"para2\":\"It is the first hospital day care centre in the world in the form of a pyramid, offering multiple systems of medicine and therapy under one roof structure with the sole motto ‘Freedom from Medication’.\",\"para3\":\"Research has proven that pyramids are extraordinary energy centers. The Three Pyramids which form the Sri Shivaratnapuri Temple of Health are constructed under the guidance of His Holiness to the last detail. The length of the sides of the base of the Big Pyramid in this complex is exactly 1/5 th of the length of the sides of the base of the Great Pyramid of Egypt at Giza.\",\"para4\":\"The very unique and unprecedented feature of this construction is that no metal reinforcement at all has been used for the strength of the edifice. The non-metallic nature of this Pyramid fosters better retaining of Cosmic Energy.\",\"para5\":\"Further, it is a stand-alone pyramid on the roof slab of the basement that has parking spaces for one hundred four-wheelers and two hundred two-wheelers.\",\"para6\":\"There are three pyramids in the complex, two Small and one Big. Among the two small pyramids one serves as a children’s play area and the other is a free dispensary. The Big Pyramid houses a seven storied stepped pyramid within.\",\"profilePath\":\"1664469383853491727bannerlogo.jpg\"}', NULL, '2022-09-29 22:06:26'),
(171, 'ENew-Banner2', '{\"heading\":\"OUR DEPARTMENTS\",\"profilePath\":\"1658366817350197815bannerlogo.jpg\"}', NULL, NULL),
(172, 'eventcard', '{\"cardsList\":[{\"heading\":\"YOGA\",\"para\":\"Yoga is not just a form of physical exercise or doing pretzel poses only, it’s not just a few breathing techniques...\",\"backgroundPath\":\"1658428044273363599medical.jpg\",\"frontPath\":\"1658428053360515035medical.jpg\"},{\"heading\":\"MEDITATION \",\"para\":\"Meditation is the delicate art of doing nothing and letting go of all efforts to relax in your true nature...\",\"backgroundPath\":\"1658428069540932185medical.jpg\",\"frontPath\":\"1658428092685578726medical.jpg\"},{\"heading\":\"EVENTS\",\"para\":\"Wonder Health Experience, aimed at the wellbeing of the human race, is an initiative from Sri Shivaratnapuri Temple...\",\"backgroundPath\":\"1658428105115489111medical.jpg\",\"frontPath\":\"1658428112342616859medical.jpg\"}]}', NULL, '2022-07-21 23:58:37'),
(173, 'dbannerdata1', '{\"heading\":\"WONDER HEALTH EXPERIENCE\",\"profilePath\":\"1665678700431932798bannerlogo.jpg\"}', NULL, '2022-10-13 22:01:44'),
(174, 'dservice1', '{\"mainheading\":\"Services and Prices:\",\"heading1\":\"Wonder Health Experience Fee Per Person\",\"name\":\"Senior Citizens : above 60 Years\",\"price\":\"Rs.100\",\"para\":\"Adults : 18 to 60 Years\",\"price1\":\"Rs.200\",\"para1\":\"Youth : 12 to 18 Years\",\"price2\":\"Rs.100\",\"para2\":\"Children : Below 12 Years\",\"price3\":\" Rs.50\",\"heading2\":\"Student Group Fee\",\"para3\":\"Student Groups (with ID Cards) Per Student\",\"price4\":\"Rs.50\",\"para4\":\"Teacher\'s by an Educational Institution \",\"price5\":\"Rs.50\"}', NULL, '2022-10-19 11:55:57'),
(175, 'dcont1', '{\"mainheading1\":\"Wonder Health Experience\",\"mainpara\":\"Wonder Health Experience, aimed at the wellbeing of the human race, is an initiative from Sri Shivaratnapuri Temple of Health. This program is being organized from 18th April 2022 to 17th July 2022 on a daily basis. During this period, on each day, nine sessions will be organized, wherein the participants will visit Sri Shivaratnapuri Temple of Health, a Tri-Pyramidal Abode of Wellbeing.\",\"subheading\":\"The ‘Wonder Health Experience’ will include the following::\",\"parap\":\"Dedicated 25-member group per visit for a two-hour duration.\",\"parap1\":\"Visit to the museum named ‘Aarogya Swarga’ located at the basement of the Big Pyramid that exhibits the history and innovative architectural design of the pyramid. An introductory audio-video will be presented.\",\"parap2\":\"Visit to the free dispensary and children’s play area.\",\"parap3\":\"Visit to all the seven floors of the Big Pyramid, each floor corresponding to one Chakra of the Seven Yogic Chakras in the human body. The visitor will witness in person the grandeur of size, design, and construction of pyramids and at the same time be a fortunate recipient of divine cosmic energy generated in the pyramid.\",\"parap4\":\"Dedicated 25-member group per visit for a two-hour duration.\",\"parap5\":\"Visit to the museum named ‘Aarogya Swarga’ located at the basement of the Big Pyramid that exhibits the history and innovative architectural design of the pyramid. An introductory audio-video will be presented.\",\"parap6\":\"Visit to the free dispensary and children’s play area.\",\"parap7\":\"Visit to all the seven floors of the Big Pyramid, each floor corresponding to one Chakra of the Seven Yogic Chakras in the human body. The visitor will witness in person the grandeur of size, design, and construction of pyramids and at the same time be a fortunate recipient of divine cosmic energy generated in the pyramid.\",\"subpara\":\"WANT TO EXPERIENCE THE POWERS OF THIS PYRAMIDAL MONUMENT?\"}', NULL, '2022-10-08 13:36:09'),
(176, 'bannercardone1', '[{\"heading\":\"Yoga\",\"profilePath\":\"1671021568812171797medical.jpg\"},{\"heading\":\"Meditation\",\"profilePath\":\"1671021582299132816medical.jpg\"},{\"heading\":\"Event\",\"profilePath\":\"1671021606192819716medical.jpg\"}]', NULL, '2022-12-14 18:11:07'),
(177, 'doctorsdata1', '{\"mainheading\":\"OUR DOCTORS\",\"cardsList\":[{\"heading\":\"Dr. William Gardner\",\"para\":\"Mon-Thu     \",\"name\":\"Cardiolog\",\"para1\":\"Friday       \",\"para2\":\"Saturday    \",\"profilePath\":\"1658425625996368014medical.jpg\",\"time\":\"09:00 - 18:00\",\"time1\":\"07:00 - 14:00\",\"time2\":\"09:00 - 12:00\"},{\"heading\":\"Dr. Ann Great\",\"para\":\"Mon-Thu    \",\"name\":\"Pediatrist\",\"para1\":\"Friday       \",\"para2\":\"Saturday     \",\"profilePath\":\"1658425178866406561bannerlogo.jpg\",\"time2\":\"09:00 - 12:00\",\"time1\":\" 07:00 - 14:00\",\"time\":\"08:00 - 18:00\"},{\"heading\":\"Dr. John Whatson\",\"para\":\"Mon-Thu  \",\"name\":\"Neurolog\",\"para1\":\"Friday     \",\"para2\":\"Saturday     \",\"profilePath\":\"1658425296421773944bannerlogo.jpg\",\"time\":\"  08:00 - 18:00\",\"time1\":\"07:00 - 14:00\",\"time2\":\" 09:00 - 12:00\"},{\"heading\":\"Dr. Julia Roberts\",\"para\":\"Mon-Thu    \",\"name\":\"Cardiolog\",\"para1\":\"Friday   \",\"para2\":\"Saturday     \",\"profilePath\":\"1658425411988123074bannerlogo.jpg\",\"time2\":\"09:00 - 12:00\",\"time1\":\" 07:00 - 14:00\",\"time\":\"08:00 - 18:00\"}]}', NULL, '2022-07-22 12:58:36'),
(178, 'latestnew2', '{\"mainheading\":\"LATEST BLOGS\",\"cardsList\":[{\"heading\":\"Improvements in Technology\",\"para\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\",\"profilePath\":\"1664371557951213374medical.jpg\",\"para1\":\"Now 28. 2019\"},{\"heading\":\"Improvements in Technology\",\"para\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\",\"profilePath\":\"1664371566954411749medical.jpg\",\"para1\":\"Now 28. 2019\"},{\"heading\":\"Improvements in Technology\",\"para\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\",\"profilePath\":\"1664371577183339610medical.jpg\",\"para1\":\"Now 28. 2019\"},{\"heading\":\"Improvements in Technology\",\"para\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.\",\"profilePath\":\"1664371583080822248medical.jpg\",\"para1\":\"Now 28. 2019\"}]}', NULL, '2022-09-28 18:56:25');
INSERT INTO `staticPages` (`staticPageId`, `name`, `content`, `createdDate`, `updatedDate`) VALUES
(179, 'doctorsdata2', '{\"mainheading\":\"OUR DOCTORS\",\"cardsList\":[{\"heading\":\"Vishwapriya Natarajan\",\"name\":\"Dentist\",\"para\":\"Mon-Thu\",\"time\":\"08:00 - 18:00\",\"para1\":\"Friday\",\"time1\":\"07:00 - 14:00\",\"para2\":\"Saturday\",\"time2\":\"09:00 - 12:00\",\"profilePath\":\"1671022313356134875medical.jpg\"},{\"heading\":\"Dr. Annapoorna Parthasarathi\",\"name\":\"General Physician\",\"para\":\"Mon-Thu\",\"time\":\"08:00 - 18:00\",\"para1\":\"Friday\",\"time1\":\"07:00 - 14:00\",\"para2\":\"Saturday\",\"time2\":\"09:00 - 12:00\",\"profilePath\":\"1671022368076788339medical.jpg\"},{\"heading\":\"R. C. Sekhar\",\"name\":\"Dentist\",\"para\":\"Mon-Thu\",\"time\":\"08:00 - 18:00\",\"para1\":\"Friday\",\"time1\":\"07:00 - 14:00\",\"para2\":\"Saturday\",\"time2\":\"09:00 - 12:00\",\"profilePath\":\"1671022405229723278medical.jpg\"}]}', NULL, '2022-12-14 18:23:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobileNumber` varchar(15) NOT NULL,
  `roleId` int(11) NOT NULL,
  `password` text NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `name`, `email`, `mobileNumber`, `roleId`, `password`, `createdDate`, `updatedDate`) VALUES
(7, 'Himabindhu', 'tammahimabindhu@gmail.com', '8341274720', 2, '5e6af1d7a6e1546909ddaf5fa7064ecbf27456f6a7526b32d3864da66a1ee259', NULL, NULL),
(8, 'Super Admin', 'superadmin@gmail.com', '8745859682', 3, '5e6af1d7a6e1546909ddaf5fa7064ecbf27456f6a7526b32d3864da66a1ee259', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userType`
--

CREATE TABLE `userType` (
  `userTypeId` int(11) NOT NULL,
  `userTypec` varchar(45) NOT NULL,
  `createdDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedDate` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userType`
--

INSERT INTO `userType` (`userTypeId`, `userTypec`, `createdDate`, `updatedDate`) VALUES
(1, 'SeniorCitizens', NULL, '2022-10-19 12:05:21'),
(2, 'Childrens', NULL, '2022-10-11 19:06:51'),
(3, 'Adults', NULL, '2022-10-19 12:05:33'),
(4, 'Youth', NULL, '2022-10-19 12:05:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `eventBookings`
--
ALTER TABLE `eventBookings`
  ADD PRIMARY KEY (`eventBookingId`),
  ADD KEY `userId_fk_ eventBookings_idx` (`userId`),
  ADD KEY `eventTypeId_fk_ eventBookings_idx` (`eventTypeId`),
  ADD KEY `eventSessiond_fk_ eventBookings_idx` (`eventSessionId`);

--
-- Indexes for table `eventFee`
--
ALTER TABLE `eventFee`
  ADD PRIMARY KEY (`eventFeeId`),
  ADD KEY `userTyped_fk_yogaFee_idx` (`userTypeId`),
  ADD KEY `eventTypeId_fk_eventFee_idx` (`eventSessionId`);

--
-- Indexes for table `eventParticipants`
--
ALTER TABLE `eventParticipants`
  ADD PRIMARY KEY (`eventParticipantId`),
  ADD KEY `eventBookingId_fk_eventParticipents_idx` (`eventBookingId`),
  ADD KEY `userTypeId_fk_eventParticipants_idx` (`userTypeId`);

--
-- Indexes for table `eventSessions`
--
ALTER TABLE `eventSessions`
  ADD PRIMARY KEY (`eventSessionId`),
  ADD UNIQUE KEY `unique_event_session` (`eventTypeId`,`date`,`time`,`dateTime`),
  ADD KEY `actonBy_fk_yogaSessions_idx` (`actionBy`),
  ADD KEY `eventTypeId_fk_eventSessions_idx` (`eventTypeId`);

--
-- Indexes for table `eventType`
--
ALTER TABLE `eventType`
  ADD PRIMARY KEY (`eventTypeId`),
  ADD UNIQUE KEY `eventType_UNIQUE` (`eventType`),
  ADD KEY `actionBy_fk_eventType_idx` (`actionBy`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleId`),
  ADD UNIQUE KEY `roleName_UNIQUE` (`roleName`);

--
-- Indexes for table `staticPages`
--
ALTER TABLE `staticPages`
  ADD PRIMARY KEY (`staticPageId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `mobileNumber_UNIQUE` (`mobileNumber`),
  ADD KEY `roleId_fk_users_idx` (`roleId`);

--
-- Indexes for table `userType`
--
ALTER TABLE `userType`
  ADD PRIMARY KEY (`userTypeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `eventBookings`
--
ALTER TABLE `eventBookings`
  MODIFY `eventBookingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `eventFee`
--
ALTER TABLE `eventFee`
  MODIFY `eventFeeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `eventParticipants`
--
ALTER TABLE `eventParticipants`
  MODIFY `eventParticipantId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `eventSessions`
--
ALTER TABLE `eventSessions`
  MODIFY `eventSessionId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `eventType`
--
ALTER TABLE `eventType`
  MODIFY `eventTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `staticPages`
--
ALTER TABLE `staticPages`
  MODIFY `staticPageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `userType`
--
ALTER TABLE `userType`
  MODIFY `userTypeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `eventBookings`
--
ALTER TABLE `eventBookings`
  ADD CONSTRAINT `eventSessiond_fk_ eventBookings` FOREIGN KEY (`eventSessionId`) REFERENCES `eventSessions` (`eventSessionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `eventTypeId_fk_ eventBookings` FOREIGN KEY (`eventTypeId`) REFERENCES `eventType` (`eventTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userId_fk_ eventBookings` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventFee`
--
ALTER TABLE `eventFee`
  ADD CONSTRAINT `eventTypeId_fk_eventFee` FOREIGN KEY (`eventSessionId`) REFERENCES `eventSessions` (`eventSessionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userTyped_fk_yogaFee` FOREIGN KEY (`userTypeId`) REFERENCES `userType` (`userTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventParticipants`
--
ALTER TABLE `eventParticipants`
  ADD CONSTRAINT `eventBookingId_fk_eventParticipents` FOREIGN KEY (`eventBookingId`) REFERENCES `eventBookings` (`eventBookingId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userTypeId_fk_eventParticipants` FOREIGN KEY (`userTypeId`) REFERENCES `userType` (`userTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventSessions`
--
ALTER TABLE `eventSessions`
  ADD CONSTRAINT `actonBy_fk_yogaSessions` FOREIGN KEY (`actionBy`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `eventTypeId_fk_eventSessions` FOREIGN KEY (`eventTypeId`) REFERENCES `eventType` (`eventTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `eventType`
--
ALTER TABLE `eventType`
  ADD CONSTRAINT `actionBy_fk_eventType` FOREIGN KEY (`actionBy`) REFERENCES `users` (`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `roleId_fk_users` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
