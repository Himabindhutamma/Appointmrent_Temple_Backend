-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 21, 2022 at 02:53 PM
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
-- Database: `warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `chamber_antenna`
--

CREATE TABLE `chamber_antenna` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `antenna_name` varchar(255) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL,
  `warehouse_chamber_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `commodity`
--

CREATE TABLE `commodity` (
  `commodity_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `commodity_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `commodity`
--

INSERT INTO `commodity` (`commodity_id`, `created_date`, `modified_date`, `audited_by`, `commodity_name`) VALUES
(1, NULL, NULL, NULL, 'RICE'),
(2, NULL, NULL, NULL, 'WHEAT');

-- --------------------------------------------------------

--
-- Table structure for table `commodity_tags`
--

CREATE TABLE `commodity_tags` (
  `commodity_tags_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `assigned_to` varchar(255) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `tag_number` varchar(255) DEFAULT NULL,
  `tag_type_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `commodity_tags_transactions`
--

CREATE TABLE `commodity_tags_transactions` (
  `commodity_tags_trans_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `activity_time` varchar(255) DEFAULT NULL,
  `added_time` varchar(255) DEFAULT NULL,
  `antenna_name` varchar(255) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `commodity_tag_commodity_tags_id` bigint(20) DEFAULT NULL,
  `inventory_transactions_inventory_trans_id` bigint(20) DEFAULT NULL,
  `labour_tags_transactions_labour_tags_trans_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gst` varchar(255) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `admin_user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `company_admin`
--

CREATE TABLE `company_admin` (
  `company_admin_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `company_company_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer_assigned_tags`
--

CREATE TABLE `customer_assigned_tags` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `customer_tag_customer_tag_id` bigint(20) DEFAULT NULL,
  `farmer_farmer_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer_tags`
--

CREATE TABLE `customer_tags` (
  `customer_tag_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `tag_number` varchar(255) DEFAULT NULL,
  `tag_type_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `customer_tags_transactions`
--

CREATE TABLE `customer_tags_transactions` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `customer_assigned_tag_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `event_data` longtext,
  `event_name` varchar(255) DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `inventory_transaction_inventory_trans_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `farmer_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `aadhar_back_path` varchar(255) DEFAULT NULL,
  `aadhar_card_no` varchar(255) DEFAULT NULL,
  `aadhar_front_path` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `farmer_mark` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `is_available` bit(1) DEFAULT NULL,
  `pan_back_path` varchar(255) DEFAULT NULL,
  `pan_front_path` varchar(255) DEFAULT NULL,
  `pan_number` varchar(255) DEFAULT NULL,
  `profile_path` varchar(255) DEFAULT NULL,
  `user_user_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `available_quantity` int(11) DEFAULT NULL,
  `blocked_quantity` int(11) DEFAULT NULL,
  `bond_url` longtext,
  `cold_storage_charges` varchar(255) DEFAULT NULL,
  `commodity_age` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `insurance_charges` varchar(255) DEFAULT NULL,
  `inventory_charges` varchar(255) DEFAULT NULL,
  `invoice_url` longtext,
  `loading_hamali_charges` varchar(255) DEFAULT NULL,
  `lot_name` varchar(255) DEFAULT NULL,
  `other_charges` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `sales_tax` varchar(255) DEFAULT NULL,
  `sample_out` int(11) DEFAULT NULL,
  `sample_test_quantity` int(11) DEFAULT NULL,
  `specifications` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `transport_charges` varchar(255) DEFAULT NULL,
  `un_loading_hamali_charges` varchar(255) DEFAULT NULL,
  `withdrawn_quantity` int(11) DEFAULT NULL,
  `commodity_commodity_id` bigint(20) DEFAULT NULL,
  `farmer_farmer_id` bigint(20) DEFAULT NULL,
  `unit_unit_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `inventory_trans_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `documenturl` varchar(255) DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `loan_amount` varchar(255) DEFAULT NULL,
  `start_time` date DEFAULT NULL,
  `transaction_quantity` int(11) DEFAULT NULL,
  `transaction_type` varchar(255) DEFAULT NULL,
  `buyer_farmer_farmer_id` bigint(20) DEFAULT NULL,
  `inventory_inventory_id` bigint(20) DEFAULT NULL,
  `khana_section_khana_section_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions_assigned_commodities`
--

CREATE TABLE `inventory_transactions_assigned_commodities` (
  `inventory_trans_assigned_comm_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `commodity_tag_commodity_tags_id` bigint(20) DEFAULT NULL,
  `inventory_transaction_inventory_trans_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions_assigned_employees`
--

CREATE TABLE `inventory_transactions_assigned_employees` (
  `inventory_trans_assigned_emp_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `inventory_transaction_inventory_trans_id` bigint(20) DEFAULT NULL,
  `labour_assigned_tag_labour_assigned_tag_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `khana_section`
--

CREATE TABLE `khana_section` (
  `khana_section_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `available_limit` int(11) DEFAULT NULL,
  `entry_name` varchar(255) DEFAULT NULL,
  `floor_no` int(11) DEFAULT NULL,
  `khana_code` varchar(255) DEFAULT NULL,
  `khana_name` varchar(255) DEFAULT NULL,
  `khana_section_name` varchar(255) DEFAULT NULL,
  `max_limit` int(11) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `labours`
--

CREATE TABLE `labours` (
  `labour_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `is_available` bit(1) DEFAULT NULL,
  `labour_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `labour_assigned_tags`
--

CREATE TABLE `labour_assigned_tags` (
  `labour_assigned_tag_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `labour_labour_id` bigint(20) DEFAULT NULL,
  `labour_tag_labour_tag_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `labour_tags`
--

CREATE TABLE `labour_tags` (
  `labour_tag_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `tag_number` varchar(255) DEFAULT NULL,
  `tag_type_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `labour_tags_transactions`
--

CREATE TABLE `labour_tags_transactions` (
  `labour_tags_trans_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `labour_labour_assigned_tag_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `scanners`
--

CREATE TABLE `scanners` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `scanner_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `scanners`
--

INSERT INTO `scanners` (`id`, `created_date`, `modified_date`, `audited_by`, `scanner_name`) VALUES
(1, NULL, NULL, NULL, 'RFID'),
(2, NULL, NULL, NULL, 'BARCODE');

-- --------------------------------------------------------

--
-- Table structure for table `tags_history`
--

CREATE TABLE `tags_history` (
  `tag_history_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `action_type` varchar(255) DEFAULT NULL,
  `antenna_name` varchar(255) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `detected_date` date DEFAULT NULL,
  `tag_number` varchar(255) DEFAULT NULL,
  `tag_reference` varchar(255) DEFAULT NULL,
  `tag_type` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_type` varchar(255) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tag_type`
--

CREATE TABLE `tag_type` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scanner_type_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tariff`
--

CREATE TABLE `tariff` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `unit_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `unit_name` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `created_date`, `modified_date`, `audited_by`, `email`, `mobile`, `password`, `role`, `username`) VALUES
(1, NULL, NULL, NULL, 'super_admin@gmail.com', '9999999999', '$2a$10$nGRAytL0msaJ9S2KQPrpTuID555mr/4pt8nFv4H/LLyT9iLJw2aMa', 'SUPER_ADMIN', 'SuperAdmin');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_history`
--

CREATE TABLE `vehicle_history` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `commodity_count` varchar(255) DEFAULT NULL,
  `in_time` varchar(255) DEFAULT NULL,
  `lot_owner` varchar(255) DEFAULT NULL,
  `out_time` varchar(255) DEFAULT NULL,
  `vehicle_number` varchar(255) DEFAULT NULL,
  `vehicle_type` varchar(255) DEFAULT NULL,
  `commodity_commodity_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `warehouse_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `storage_cost` int(11) DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `cold_storage_charges` int(11) DEFAULT NULL,
  `cold_storage_charges_in_percentage` int(11) DEFAULT NULL,
  `insurance_charges_in_percentage` int(11) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `loading_hamali_charges_in_percentage` int(11) DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `no_of_entries` int(11) DEFAULT NULL,
  `no_of_floors` int(11) DEFAULT NULL,
  `other_charges_in_percentage` int(11) DEFAULT NULL,
  `registration_number` varchar(255) DEFAULT NULL,
  `sales_tax_in_percentage` int(11) DEFAULT NULL,
  `time_period` int(11) DEFAULT NULL,
  `total_capacity` bigint(20) DEFAULT NULL,
  `transport_charges_in_percentage` int(11) DEFAULT NULL,
  `un_loading_hamali_charges_in_percentage` int(11) DEFAULT NULL,
  `warehouse_address` varchar(255) DEFAULT NULL,
  `warehouse_name` varchar(255) DEFAULT NULL,
  `weightfor_cost` int(11) DEFAULT NULL,
  `working_time` varchar(255) DEFAULT NULL,
  `company_company_id` bigint(20) DEFAULT NULL,
  `scanner_type_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_admin`
--

CREATE TABLE `warehouse_admin` (
  `warehouse_admin_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_admin_assigned_tags`
--

CREATE TABLE `warehouse_admin_assigned_tags` (
  `warehouse_admin_assigned_tags_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `warehouse_admin_warehouse_admin_id` bigint(20) DEFAULT NULL,
  `warehouse_admin_tags_warehouse_admin_tag_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_admin_tags`
--

CREATE TABLE `warehouse_admin_tags` (
  `warehouse_admin_tag_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `is_assigned` bit(1) DEFAULT NULL,
  `tag_number` varchar(255) DEFAULT NULL,
  `tag_type_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_admin_tags_transactions`
--

CREATE TABLE `warehouse_admin_tags_transactions` (
  `warehouse_admin_tags_trans_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `warehouse_admin_assigned_tag_warehouse_admin_assigned_tags_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_chamber`
--

CREATE TABLE `warehouse_chamber` (
  `id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `chamber_name` varchar(255) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_commodities`
--

CREATE TABLE `warehouse_commodities` (
  `warehouse_commodities_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `audited_by` bigint(20) DEFAULT NULL,
  `no_of_days` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `commodity_commodity_id` bigint(20) DEFAULT NULL,
  `unit_unit_id` bigint(20) DEFAULT NULL,
  `warehouse_warehouse_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chamber_antenna`
--
ALTER TABLE `chamber_antenna`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKdiohqnhdu5n94ybotsby1s2b` (`warehouse_warehouse_id`),
  ADD KEY `FK5v4nqdv3chbb7t3tp4u89flay` (`warehouse_chamber_id`);

--
-- Indexes for table `commodity`
--
ALTER TABLE `commodity`
  ADD PRIMARY KEY (`commodity_id`);

--
-- Indexes for table `commodity_tags`
--
ALTER TABLE `commodity_tags`
  ADD PRIMARY KEY (`commodity_tags_id`),
  ADD KEY `FKdcqar9ximinh0ew0rxgrabi86` (`tag_type_id`),
  ADD KEY `FKt4ykrpeyht6yejreb99w02o0h` (`warehouse_warehouse_id`);

--
-- Indexes for table `commodity_tags_transactions`
--
ALTER TABLE `commodity_tags_transactions`
  ADD PRIMARY KEY (`commodity_tags_trans_id`),
  ADD KEY `FK1roa5hyfyx0b6k1n509w8stb5` (`commodity_tag_commodity_tags_id`),
  ADD KEY `FKly05t5pahwciq8ss4n2vjcdpr` (`inventory_transactions_inventory_trans_id`),
  ADD KEY `FK8speqcpwiv44p6nb59v9gmmk4` (`labour_tags_transactions_labour_tags_trans_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`),
  ADD UNIQUE KEY `UK_qhwyi86uav63motx22y04wwjt` (`mobile`),
  ADD KEY `FK2gbmtmr9ymh80ok5qcfbk67uq` (`admin_user_id`);

--
-- Indexes for table `company_admin`
--
ALTER TABLE `company_admin`
  ADD PRIMARY KEY (`company_admin_id`),
  ADD KEY `FK3fkfm2cwpm39pover2wx6jekn` (`company_company_id`),
  ADD KEY `FK36bs4lpv8j5ot4c37skt4ihwr` (`user_id`);

--
-- Indexes for table `customer_assigned_tags`
--
ALTER TABLE `customer_assigned_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKm1cy70vqvbij0u0psbrhv3lsk` (`customer_tag_customer_tag_id`),
  ADD KEY `FKmtbq1dmkj43qaoww1rwhu6s3a` (`farmer_farmer_id`);

--
-- Indexes for table `customer_tags`
--
ALTER TABLE `customer_tags`
  ADD PRIMARY KEY (`customer_tag_id`),
  ADD UNIQUE KEY `UKagec067iuigm72e04atnsa6up` (`tag_number`),
  ADD KEY `FKls9m7uqpaja81hl4gme63m57x` (`tag_type_id`),
  ADD KEY `FKiej86fo9h0f4mk1gmf7xvt0jl` (`warehouse_warehouse_id`);

--
-- Indexes for table `customer_tags_transactions`
--
ALTER TABLE `customer_tags_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKf5rvnyjgmrb9fodvy4sinrioy` (`customer_assigned_tag_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9c6e14w6jxr296yad4tv7fl8d` (`inventory_transaction_inventory_trans_id`),
  ADD KEY `FKgej10454091f8vgamhe53cf27` (`warehouse_warehouse_id`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`farmer_id`),
  ADD KEY `FKoquirsieo2mlj4qmiflcistlu` (`user_user_id`),
  ADD KEY `FKtcv9h0cmkopfx7gqmc7uptna` (`warehouse_warehouse_id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `FK1taabvtairne9gxi1b15w5ymu` (`commodity_commodity_id`),
  ADD KEY `FKga8odnr1j24kl4sqbtvjxsh6o` (`farmer_farmer_id`),
  ADD KEY `FKh83ja9n0as6un09nh96h0v9f8` (`unit_unit_id`),
  ADD KEY `FKjcnhs318qjec6stkorcsqs36s` (`warehouse_warehouse_id`);

--
-- Indexes for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD PRIMARY KEY (`inventory_trans_id`),
  ADD KEY `FKfcn0j8be001pggt2e96i3d4sa` (`buyer_farmer_farmer_id`),
  ADD KEY `FKlc7pg4gftapgko7hu311gv40y` (`inventory_inventory_id`),
  ADD KEY `FKs0164fv6rf1msf8bhio599np9` (`khana_section_khana_section_id`);

--
-- Indexes for table `inventory_transactions_assigned_commodities`
--
ALTER TABLE `inventory_transactions_assigned_commodities`
  ADD PRIMARY KEY (`inventory_trans_assigned_comm_id`),
  ADD KEY `FK1ka686jf93f4tigcc37hfncm2` (`commodity_tag_commodity_tags_id`),
  ADD KEY `FK3g79poshwn7omksa4hit3ctoo` (`inventory_transaction_inventory_trans_id`);

--
-- Indexes for table `inventory_transactions_assigned_employees`
--
ALTER TABLE `inventory_transactions_assigned_employees`
  ADD PRIMARY KEY (`inventory_trans_assigned_emp_id`),
  ADD KEY `FK6v4j2bh0ur8oi6jc254r7lojm` (`inventory_transaction_inventory_trans_id`),
  ADD KEY `FKgxth3au37uj0sfr1dj1gy8doq` (`labour_assigned_tag_labour_assigned_tag_id`);

--
-- Indexes for table `khana_section`
--
ALTER TABLE `khana_section`
  ADD PRIMARY KEY (`khana_section_id`),
  ADD KEY `FKpcooqjeviijrnuelum8kbkl55` (`warehouse_warehouse_id`);

--
-- Indexes for table `labours`
--
ALTER TABLE `labours`
  ADD PRIMARY KEY (`labour_id`),
  ADD UNIQUE KEY `UK_1yakl1t1m7ac157lt15q5mp65` (`mobile`),
  ADD KEY `FKshfit5d3mv4vmeec25tmicebo` (`warehouse_warehouse_id`);

--
-- Indexes for table `labour_assigned_tags`
--
ALTER TABLE `labour_assigned_tags`
  ADD PRIMARY KEY (`labour_assigned_tag_id`),
  ADD KEY `FKbayvcf4xcs7mnuow1o0usfowd` (`labour_labour_id`),
  ADD KEY `FK4arenqwjkor7nmdie0hka4s5c` (`labour_tag_labour_tag_id`);

--
-- Indexes for table `labour_tags`
--
ALTER TABLE `labour_tags`
  ADD PRIMARY KEY (`labour_tag_id`),
  ADD UNIQUE KEY `UKq9c5qk6ylgg7x1c5dlts2f4qo` (`tag_number`),
  ADD KEY `FKabj9013mcwsll82kree0teno0` (`tag_type_id`),
  ADD KEY `FKjqqbocf3bus3ld5h4aajg02j3` (`warehouse_warehouse_id`);

--
-- Indexes for table `labour_tags_transactions`
--
ALTER TABLE `labour_tags_transactions`
  ADD PRIMARY KEY (`labour_tags_trans_id`),
  ADD KEY `FKja8un3cxb37rxa6ml6913x0dq` (`labour_labour_assigned_tag_id`);

--
-- Indexes for table `scanners`
--
ALTER TABLE `scanners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags_history`
--
ALTER TABLE `tags_history`
  ADD PRIMARY KEY (`tag_history_id`),
  ADD KEY `FKlnv6p0wraljh9bx0v5a4ri31e` (`warehouse_warehouse_id`);

--
-- Indexes for table `tag_type`
--
ALTER TABLE `tag_type`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKe0bru1o5bk9858sc44mammlql` (`scanner_type_id`);

--
-- Indexes for table `tariff`
--
ALTER TABLE `tariff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`unit_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UK_63cf888pmqtt5tipcne79xsbm` (`mobile`),
  ADD UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`);

--
-- Indexes for table `vehicle_history`
--
ALTER TABLE `vehicle_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKq8n77jr78s7qw989lgd5g6sbc` (`commodity_commodity_id`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`warehouse_id`),
  ADD KEY `FKfufoxg42lixl92alek0t36h7c` (`company_company_id`),
  ADD KEY `FKkywjls9iyvr5xe6vahv7ffq1u` (`scanner_type_id`);

--
-- Indexes for table `warehouse_admin`
--
ALTER TABLE `warehouse_admin`
  ADD PRIMARY KEY (`warehouse_admin_id`),
  ADD KEY `FKc9pkxo4olmw3lgsmpxa24yy57` (`user_id`),
  ADD KEY `FKl5c6gcy3lbtegaurtapvctjxv` (`warehouse_warehouse_id`);

--
-- Indexes for table `warehouse_admin_assigned_tags`
--
ALTER TABLE `warehouse_admin_assigned_tags`
  ADD PRIMARY KEY (`warehouse_admin_assigned_tags_id`),
  ADD KEY `FKi5f7ltap7gy9kdlax9jk8qy8h` (`warehouse_admin_warehouse_admin_id`),
  ADD KEY `FKg79a5atiaos94g6crcox22nac` (`warehouse_admin_tags_warehouse_admin_tag_id`);

--
-- Indexes for table `warehouse_admin_tags`
--
ALTER TABLE `warehouse_admin_tags`
  ADD PRIMARY KEY (`warehouse_admin_tag_id`),
  ADD UNIQUE KEY `UKih8l1kuc13i7xefeu21hwx86g` (`tag_number`),
  ADD KEY `FKg6vf4tuctkda5ufki01ssx2rp` (`tag_type_id`),
  ADD KEY `FKjp7y6qmqna5h6oks4bou91o9v` (`warehouse_warehouse_id`);

--
-- Indexes for table `warehouse_admin_tags_transactions`
--
ALTER TABLE `warehouse_admin_tags_transactions`
  ADD PRIMARY KEY (`warehouse_admin_tags_trans_id`),
  ADD KEY `FKr7tg00k1tgxn8xgeq65f7gl6w` (`warehouse_admin_assigned_tag_warehouse_admin_assigned_tags_id`);

--
-- Indexes for table `warehouse_chamber`
--
ALTER TABLE `warehouse_chamber`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK78gkwxm5m682fjl6j0tegnry3` (`warehouse_warehouse_id`);

--
-- Indexes for table `warehouse_commodities`
--
ALTER TABLE `warehouse_commodities`
  ADD PRIMARY KEY (`warehouse_commodities_id`),
  ADD KEY `FKnhve3y3h0meok35hc59lggkrc` (`commodity_commodity_id`),
  ADD KEY `FKqj0t4qbl7oale2djwefdwsjht` (`unit_unit_id`),
  ADD KEY `FKi7ogyn94wu0wism22fe8gl6jx` (`warehouse_warehouse_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chamber_antenna`
--
ALTER TABLE `chamber_antenna`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commodity`
--
ALTER TABLE `commodity`
  MODIFY `commodity_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `commodity_tags`
--
ALTER TABLE `commodity_tags`
  MODIFY `commodity_tags_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `commodity_tags_transactions`
--
ALTER TABLE `commodity_tags_transactions`
  MODIFY `commodity_tags_trans_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_admin`
--
ALTER TABLE `company_admin`
  MODIFY `company_admin_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_assigned_tags`
--
ALTER TABLE `customer_assigned_tags`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_tags`
--
ALTER TABLE `customer_tags`
  MODIFY `customer_tag_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer_tags_transactions`
--
ALTER TABLE `customer_tags_transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `farmer_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `inventory_trans_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_transactions_assigned_commodities`
--
ALTER TABLE `inventory_transactions_assigned_commodities`
  MODIFY `inventory_trans_assigned_comm_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_transactions_assigned_employees`
--
ALTER TABLE `inventory_transactions_assigned_employees`
  MODIFY `inventory_trans_assigned_emp_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khana_section`
--
ALTER TABLE `khana_section`
  MODIFY `khana_section_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `labours`
--
ALTER TABLE `labours`
  MODIFY `labour_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `labour_assigned_tags`
--
ALTER TABLE `labour_assigned_tags`
  MODIFY `labour_assigned_tag_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `labour_tags`
--
ALTER TABLE `labour_tags`
  MODIFY `labour_tag_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `labour_tags_transactions`
--
ALTER TABLE `labour_tags_transactions`
  MODIFY `labour_tags_trans_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scanners`
--
ALTER TABLE `scanners`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tags_history`
--
ALTER TABLE `tags_history`
  MODIFY `tag_history_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tag_type`
--
ALTER TABLE `tag_type`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tariff`
--
ALTER TABLE `tariff`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `unit_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicle_history`
--
ALTER TABLE `vehicle_history`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `warehouse_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse_admin`
--
ALTER TABLE `warehouse_admin`
  MODIFY `warehouse_admin_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse_admin_assigned_tags`
--
ALTER TABLE `warehouse_admin_assigned_tags`
  MODIFY `warehouse_admin_assigned_tags_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse_admin_tags`
--
ALTER TABLE `warehouse_admin_tags`
  MODIFY `warehouse_admin_tag_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse_admin_tags_transactions`
--
ALTER TABLE `warehouse_admin_tags_transactions`
  MODIFY `warehouse_admin_tags_trans_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse_chamber`
--
ALTER TABLE `warehouse_chamber`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `warehouse_commodities`
--
ALTER TABLE `warehouse_commodities`
  MODIFY `warehouse_commodities_id` bigint(20) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
