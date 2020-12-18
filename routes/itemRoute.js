const express=require('express')
const router=express.Router()
const Item=require('../models/Item')

//@route GET api/items
//@desc Get All Items
//@access Public
router.get('/', async(req,res)=>{
	try{
		const items=await Item.find().sort({date:-1})
		res.send(items)
	}catch(err){
		res.status(500).send({message:err.message})
	}
})

router.post('/', async(req,res)=>{
	try{
		const newItem=await new Item({name:req.body.name})
		newItem.save()
		res.send(newItem)
	}catch(err){
		res.status(500).send({message:err.message})
	}
})

router.delete('/:id', async(req,res)=>{
	try{
		await Item.remove({_id:req.params.id})
		res.send({message:'Success in deleting'})
		//Item.findById(req.params.id).then(item=>item.remove().then(()=>res.json({success:true})))
	}catch(err){
		res.status(500).send({message:err.message})
	}
})

module.exports=router