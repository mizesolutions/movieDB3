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
  `TITLE` varchar(40) NOT NULL,
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=01 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `MOVIES`
--

INSERT INTO `MOVIES` (`TITLE`) VALUES
('The Proposal'),
('Star Wars: Episode IV - A New Hope'),
('The Godfather'),
('Hackers'),
('Monty Python and the Holy Grail'),
('The Shawshank Redemption'),
('The Godfather: Part II'),
('Young Frankenstein'),
('The Texas Chain Saw Massacre'),
('The Rocky Horror Picture Show');


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
