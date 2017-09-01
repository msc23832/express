import { Router, Request, Response } from 'express';
import * as pg from 'pg';
import * as postgres from '../../helpers/postgres';
import * as xl from 'excel4node';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    let data = req.body;

    postgres.doQuery(`insert into tb_company (comp_code, comp_name) values ('${data.code}','${data.name}')`, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result);
        }
    });
});

router.post('/search', (req: Request, res: Response) => {
    let ret = {
        rows: [],
        total: 0
    };
    let data = req.body
    postgres.doQuery(`select * from tb_company where comp_name LIKE '%${data.name}%' offset (${data.numPage} * ${data.rowPerPage}) limit ${data.rowPerPage}`, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            ret.rows = result.rows;
            res.json(ret);
        }
    });
});

router.put('/:id', (req: Request, res: Response) => {
    let data = req.body;
    postgres.doQuery(`update tb_company set comp_code = '${data.compCode}', comp_name = '${data.compName}' where comp_code = '${req.params.id}' `, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result.rows);
        }
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    let data = req.body;

    postgres.doQuery(`delete from tb_company where comp_code = '${req.params.id}' `, (error, result) => {
        if (error) {
            res.json(error);
        } else {
            res.json(result.rows);
        }
    });
});

// router.get('/excel', (req: Request, res: Response)=> {
//     var wb =  new xl.Workbook();
//     var ws = wb.addWorksheet('Sheet 1');
//     ws.cell(1, 1).string("Reconcile report").style({
//         font: {
//             bold : true
//         }
//     });

//     wb.write("test.xlsx", (error, result) => {
//         res.json(result);
//     });
// });

router.get('/excel', (req: Request, res: Response)=>{
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Sheet 1');
    ws.cell(1, 1).string("Reconcile report")
              .style({
                  font: {
                     bold : true
                  }
            });
    wb.write("test.xlsx", (error, result)=>{
        res.download("test.xlsx");
    });
});

export const CompanyController: Router = router;