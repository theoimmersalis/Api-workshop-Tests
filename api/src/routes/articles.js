'use strict';

let router   = api.Router();
let articleCtrl = require('../controllers/articles');

router.get('/', articleCtrl.index);
router.post('/', articleCtrl.create);
router.get('/:id', articleCtrl.show);
router.put('/:id', articleCtrl.update);
router.delete('/:id', articleCtrl.destroy);

api.app.use('/articles', router);
