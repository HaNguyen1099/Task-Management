const Task = require("../models/task.model")

const paginationHelper = require("../../../helpers/pagination")

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    }

    // Filter Status 
    if (req.query.status) {
        find.status = req.query.status
    }
   
    // Sort 
    const sort = {}

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
    }

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2
    }

    const countTasks = await Task.countDocuments(find)
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countTasks
    )

    const tasks = await Task.find(find)
                        .sort(sort)
                        .limit(objectPagination.limitItems)
                        .skip(objectPagination.skip)

    res.json(tasks)
}

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id 

        const task = await Task.findOne({
            _id: id,
            deleted: false
        })

        res.json(task)
    } catch (error) {
        res.json("Không tìm thấy!")
    }
}