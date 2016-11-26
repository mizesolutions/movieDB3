-- phpMyAdmin SQL Dump
-- version 4.3.8
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 17, 2016 at 01:38 PM
-- Server version: 5.5.51-38.2-log
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mizesolu_movies`
--

-- --------------------------------------------------------

--
-- Table structure for table `MOVIES`
--

CREATE TABLE IF NOT EXISTS `MOVIES` (
  `TITLE` varchar(40) NOT NULL,
  `YEAR` date NOT NULL,
  `STUDIO` varchar(40) DEFAULT NULL,
  `PRICE` decimal(20,2) DEFAULT NULL,
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `MOVIES`
--

INSERT INTO `MOVIES` (`TITLE`, `YEAR`, `STUDIO`, `PRICE`, `ID`) VALUES
('The Proposal', '2009-06-01', 'Touchstone Pictures', '40000000.00', 12),
('Star Wars: Episode IV - A New Hope', '1977-05-25', 'Lucasfilm', '11000000.00', 13),
('The Godfather', '1972-03-14', 'Paramount Pictures', '6000000.00', 14),
('Hackers', '1995-09-15', 'United Artists Pictures', '7564000.00', 15),
('Monty Python and the Holy Grail', '1975-03-14', 'Python (Monty) Pictures', '229575.00', 11),
('The Shawshank Redemption', '1994-09-22', 'Castle Rock Entertainment ', '25000000.00', 16),
('The Godfather: Part II', '1974-12-20', 'Paramount Pictures', '13000000.00', 17),
('Young Frankenstein', '1974-12-15', 'Gruskoff/Venture Films', '2800000.00', 18),
('The Texas Chain Saw Massacre', '1974-10-01', 'a vortex/henkel/hooper production', '83532.00', 19),
('The Rocky Horror Picture Show', '1975-08-14', 'Twentieth Century Fox Film Corporation', '1200000.00', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MOVIES`
--
-- ALTER TABLE `MOVIES`
-- ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MOVIES`
--
-- ALTER TABLE `MOVIES`
-- MODIFY `ID` mediumint(9) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
