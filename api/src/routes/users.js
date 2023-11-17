'use strict';

let router   = api.Router();
let userCtrl = require('../controllers/users');

router.get('/', userCtrl.index);
router.post('/', userCtrl.create);
router.get('/:id', userCtrl.show);
router.put('/:id', userCtrl.update);
router.delete('/:id', userCtrl.destroy);

api.app.use('/users', router);
