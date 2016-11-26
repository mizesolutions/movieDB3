-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 17, 2016 at 01:38 PM
-- Server version: 5.5.51-38.2-log
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "-08:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mizesolu_movieList`
--

-- --------------------------------------------------------

--
-- Table structure for table `MOVIES`
--

CREATE TABLE IF NOT EXISTS `MOVIES` (
  `POSTER` varchar(60) NOT NULL,
  `OVERVIEW` VARCHAR(1000),
  `YEAR` date NOT NULL,
  `TITLE` varchar(100) NOT NULL,
  `STUDIO` varchar(40) DEFAULT NULL,
  `PRICE` decimal(20,2) DEFAULT NULL,
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(`ID`)
)


--
-- Dumping data for table `MOVIES`
--

INSERT INTO `MOVIES` (`POSTER`, `OVERVIEW`, `YEAR`, `TITLE`, `STUDIO`, `PRICE`) VALUES
('/d4KNaTrltq6bpkFS01pYtyXa09m.jpg', 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.', '1972-03-14', 'The Godfather', 'Paramount Pictures', '6000000.00');



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
