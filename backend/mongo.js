// const mongoose = require('mongoose')
// mongoose.connect("mongodb://127.0.0.1:27017/Finance")
// .then(()=>{
//     console.log("connected");
// })
// .catch((e)=>{
//     console.error(e)
// })
// const newSchema = new mongoose.Schema({
//     level:{
//         type:String,
//         required:false  
//     },
//     name:{
//         type:String,
//         required:true
//     },
//     email_id:{
//         type:String,
//         required:true
//     },
//     cult:{
//         type:String,
//         required:true
//     },
//     depend:{
//         type:Number,
//         required:true
//     },
//     misc_exp:{
//         type:Number,
//         required:false
//     },
//     lst_mnth_sav:{
//         type:Number,
//         required:false
//     },
//     ann_inc:{
//         type:Number,
//         required:false
//     },
//     mnt_cst:{
//         type:Number,
//         required:false
//     },
//     rent_emi:{
//         type:Number,
//         required:false
//     },
//     area:{
//         type:String,
//         required:true
//     },
//     age:{
//         type:String,
//         required:true
//     },
//     coins:{
//         type:Number,
//         required:false
//     },
//     bof_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     bof_lvl_ls_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     bof_lvl_tq_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     bof_lvl_wt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     bof_lvl_vt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     eg_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     eg_lvl_ls_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     eg_lvl_tq_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     eg_lvl_wt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     eg_lvl_vt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     sp_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     sp_lvl_ls_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     sp_lvl_tq_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     sp_lvl_wt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     sp_lvl_vt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     fl_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     fl_lvl_ls_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     fl_lvl_tq_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     fl_lvl_wt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     },
//     fl_lvl_vt_lvl:{
//         type:Number,
//         max: 4,
//         required:false
//     }

// const { default: mongoose } = require("mongoose");

// })
// const sch_stock =new mongoose.Schema({
// 	tstmp_pur:{
// 		type:Timestamp
// 	},
// 	curr_price:{
// 		type:Number
// 	}

// }
// ) 
// const sch_mnt_cst = new mongoose.Schema({
// 	avg_rent:{
// 		type:Number,
// 		required:true
// 	},
// 	dep:{
// 		type:Number,
// 		required:true
// 	},
// 	avg_mtn_cst:{
// 		type:Number
// 	}

// })
// const userData = mongoose.model("user_Data",usr_data)
// const stockData = mongoose.model("Stock_stamp",sch_stock)
// const PredictorData = mongoose.model("Mtn_cst_prediction",sch_mnt_cst)

// module.exports=userData
// module.exports=stockData
// module.exports= PredictorData
const mongoose= require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Finance")
.then(()=>{
console.log("connected")
})
.catch(()=>{console.log("failed")})
    
const newSchema=new mongoose.Schema({
    level:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    phn_num:{
        type:Number,
        required:true
    },
    depend:{
        type:Number,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    lst_mnth_sav:{
        type:Number,
        required:true
    },
    ann_inc:{
        type:Number,
        required:true
    },
    points:{
        type:Number,
        required:true
    },
    progress:{
        type:Number,
        required:true
    }
})
const collection =mongoose.model("kashik",newSchema)
module.exports=collection