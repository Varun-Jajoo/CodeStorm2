const mongoose= require('mongoose');
const db = require("./mongo");
const userData = require('./mongo');
const stockData = require('./mongo');
const PredictorData = require('./mongo');
module.exports={
    create_user_data:function(inputData,callback){
        user_data = new userData(inputData);
        user_data.save(function(err,data){
            if (err) throw err;
            return callback(data);
        })
    },
    create_stock_data:function(inputData,callback){
        user_data = new stockData(inputData);
        user_data.save(function(err,data){
            if (err) throw err;
            return callback(data);
        })
    },
    create_mtn_cst_pred:function(inputData,callback){
        user_data = new PredictorData(inputData);
        user_data.save(function(err,data){
            if (err) throw err;
            return callback(data);
        })
    }
}