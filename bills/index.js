import express from 'express'
import create from './services/create'
import remove from './services/remove'
import list from './services/List'

const router = express.Router();

// http://localhost:3000/bills - post -  create => /service/create
router.post('/', create)

// http://localhost:3000/bills - delete -  remove => /service/remove
router.delete('/:id', remove)

// http://localhost:3000/bills - get -  remove => /service/List
router.get('/', list)

export default router