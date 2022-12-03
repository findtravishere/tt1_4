import { React, useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
import { TransactionTable } from "../components/TransactionTable";

const Home = () => {
	return (
		<div>
			<TransactionTable />
		</div>
	);
};

export default Home;
