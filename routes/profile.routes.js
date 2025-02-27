const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');



router.get('/api/profile', (req,res, next) => {
	const { _id } = req.payload
	User.findById(_id)
	.then((response) => {
		res.status(200).json(response)
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	});
});

router.post('/api/profile', (req, res, next) => {
	const {address1, address2, city, country, province, zipCode } = req.body;
	console.log(req.body)
	const { _id } = req.payload
	
	User.findByIdAndUpdate(_id,{
		
		address1:address1,
		address2:address2,
		city:city,
		country:country,
		province:province,
		zipCode: zipCode
	},
	{ new: true })
	.then((userUpdate) => {
		
		// Send a json response containing the user object
		res.status(201).json({ user: userUpdate , message: 'Updated successfully' });
		
	})
	.catch((err) => {
		console.log(err);
		res.status(500).json({ message: 'Internal Server Error' });
	});

})
//  POST /api/projects  -  Creates a new project
// router.post('/projects', (req, res, next) => {
// 	const { title, description } = req.body;

// 	Project.create({ title, description, tasks: [] })
// 		.then((response) => res.json(response))
// 		.catch((err) => res.json(err));
// });

//  GET /api/projects -  Retrieves all of the projects
// router.get('/projects', (req, res, next) => {
// 	Project.find().populate('tasks')
// 	.then((allProjects) => res.json(allProjects))
// 	.catch((err) => res.json(err));
// });

//  GET /api/projects/:projectId -  Retrieves a specific project by id
// router.get('/projects/:projectId', (req, res, next) => {
// 	const { projectId } = req.params;

// 	if (!mongoose.Types.ObjectId.isValid(projectId)) {
// 		res.status(400).json({ message: 'Specified id is not valid' });
// 		return;
// 	}

// 	// Each Project document has `tasks` array holding `_id`s of Task documents
// 	// We use .populate() method to get swap the `_id`s for the actual Task documents
// 	Project.findById(projectId)
// 		.populate('tasks')
// 		.then((project) => res.status(200).json(project))
// 		.catch((error) => res.json(error));
// });

// PUT  /api/projects/:projectId  -  Updates a specific project by id
// router.put('/projects/:projectId', (req, res, next) => {
// 	const { projectId } = req.params;

// 	if (!mongoose.Types.ObjectId.isValid(projectId)) {
// 		res.status(400).json({ message: 'Specified id is not valid' });
// 		return;
// 	}

// 	Project.findByIdAndUpdate(projectId, req.body, { new: true })
// 		.then((updatedProject) => res.json(updatedProject))
// 		.catch((error) => res.json(error));
// });

// DELETE  /api/projects/:projectId  -  Deletes a specific project by id
// router.delete('/projects/:projectId', (req, res, next) => {
// 	const { projectId } = req.params;

// 	if (!mongoose.Types.ObjectId.isValid(projectId)) {
// 		res.status(400).json({ message: 'Specified id is not valid' });
// 		return;
// 	}

// 	Project.findByIdAndRemove(projectId)
// 		.then(() =>
// 			res.json({
// 				message: `Project with ${projectId} is removed successfully.`
// 			})
// 		)
// 		.catch((error) => res.json(error));
// });



module.exports = router;
