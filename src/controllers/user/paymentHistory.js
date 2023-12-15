const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import mongoose from 'mongoose';

const paymentHistory = require('../../models/transactions/paymentHistory');
const programsPaymentHistory = require('../../models/transactions/programsPaymentHistory');
import { getQueryParams } from "../../utilities/helpers";


exports.getPaymentHistory = async function(req, res, next) {
	try {
		const params = getQueryParams(req.query, null, true);
        var paymentHistoryData =  await paymentHistory.paginate(params.filter, {
            page: params.page,
            limit: params.limit,
            sort: params.sortBy,
        });
		res.status(200).json({
			status: 'success',
			message: ' Payment History',
			data: paymentHistoryData,
		});
	} catch (e) {
		next(e);
	}
};

exports.getPaymentHistoryById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await paymentHistory.findById(id);
      res.status(200).json(payment);
    } catch (err) {
      next(err);
    }
  };

  exports.getProgramsPaymentHistory = async function(req, res, next) {
    try {
      const params = getQueryParams(req.query, null, true);
          var programsPaymentHistoryData =  await programsPaymentHistory.paginate(params.filter, {
              page: params.page,
              limit: params.limit,
              sort: params.sortBy,
          });
      res.status(200).json({
        status: 'success',
        message: ' Payment History',
        data: programsPaymentHistoryData,
      });
    } catch (e) {
      next(e);
    }
  };
  
  exports.getProgramsPaymentHistoryById = async (req, res, next) => {
      try {
        const { id } = req.params;
        const payment = await programsPaymentHistory.findById(id);
        res.status(200).json(payment);
      } catch (err) {
        next(err);
      }
    };



