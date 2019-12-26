'use strict'

module.exports = {

	// todo: https://de.wikipedia.org/wiki/Liste_der_Eisenbahnlinien_in_Brandenburg_und_Berlin

	  RE1:  [188380, 187767]
	, RE2:  2607475
	, RE3:  2609916
	, RE4:  2523200
	, RE5:  2523198
	, RE6:  90073
	, RE7:  939026
	, RE10: 2605122
	, RE15: 2607476
	, RE18: [3705112, 2046557]

	, RB10: 6924342
	, RB11: 2607477
	, RB12: 3403239
	, RB13: 3407777
	, RB14: 2607468
	// todo: RB19?
	, RB20: 3366342
	, RB21: [300432, 6593330, 6593453]
	, RB22: [6593454, 1940412, 6593455]
	, RB23: 3399395
	, RB24: [5460156, 5460157]
	, RB25: 5738329
	, RB26: 7711814
	, RB27: 3393817
	, RB31: 2607469
	, RB33: 7245456
	, RB35: 7699401
	, RB36: 3377492
	, RB43: [4713362, 4713263]
	, RB45: 2606968
	, RB46: 1691355
	, RB49: 3490614
	, RB51: 7724425
	, RB54: 3399070
	, RB55: 3366300
	, RB60: 7711813
	// todo: RB61
	, RB62: 7722438
	, RB63: 6747407
	, RB66: 7699251
	, RB91: 79804 // only one direction
	, RB93: 79819 // only one direction
	, OE65: 7724739

	// http://www.openstreetmap.org/relation/53181
	, U1:  58767
	, U2:  58428
	, U3:  58426
	, U4:  58429
	, U5:  58430
	, U55: 58431
	, U6:  51942
	, U7:  58425
	, U8:  58424
	, U9:  58423

	, RE1:  [188380, 187767]
	, RE2:  2607475
	, RE3:  2609916
	, RE4:  2523200
	, RE5:  2523198
	, RE6:  90073
	, RE7:  939026
	, RE10: 2605122
	, RE15: 2607476
	, RE18: [3705112, 2046557]

	// http://www.openstreetmap.org/relation/174108
	, M1:   67233
	, M2:   28420
	, M4:   11134
	, M5:   11135
	, M6:   17865
	, M8:   11141
	, M10:  17865
	, M13:  17884
	, M17:  28391

	// http://www.openstreetmap.org/relation/58584
	, '12': 11140
	, '16': 11143
	, '18': 11142
	, '21': 17885
	, '27': 28377
	, '37': 19451
	, '50': 28420
	, '60': 28289
	, '61': 19265
	, '62': 19296
	, '63': 19115
	, '67': 28352
	, '68': 19271

	// http://www.openstreetmap.org/relation/175260
	, F10:  90077
	, F11:  88104
	, F12:  90076
	, F21:  214226
	, F23:  222088
	, F24:  90078

	// http://www.openstreetmap.org/relation/18813
	, S1:   454054
	, S2:   61466
	, S3:   28314
	, S25:  61469
	, S41:  14981
	, S42:  14983
	, S45:  64095
	, S46:  64094
	, S47:  2413847
	, S5:   14811
	, S7:   14809
	, S75:  14810
	, S8:   14984
	, S85:  175267
	, S9:   304163

	// http://www.openstreetmap.org/relation/18812
	, '100': 17697
	, '101': 18856
	, '104': 18908
	, '106': 52425
	, '107': 56341
	, '108': 56347
	, '109': 2110347
	, '110': 51810
	, '112': 56361
	, '114': 57737
	, '115': 57732
	, '118': 304651
	, '120': 215431
	, '122': 241603
	, '123': 88363
	, '124': 58147
	, '125': 36598
	, '128': 87439
	, '130': 165983
	, '131': 167346
	, '134': 169925
	, '135': 74403
	, '136': 106490
	, '147': 282444
	, '154': 77797
	, '158': 931834
	, '160': 1119074
	, '161': 102654
	, '163': 1227013
	, '164': 35055
	, '165': 93861
	, '170': 2298563
	, '171': 78064
	, '172': 64377
	, '175': 64315
	, '179': 76248
	, '181': 63739
	, '184': 63718
	, '186': 63965
	, '187': 63740
	, '188': 1417802
	, '190': 75392
	, '191': 48515
	, '192': 39065
	, '194': 1023864
	, '195': 227622
	, '197': 67574
	, '200': 17682
	, '218': 61050
	, '221': 51804
	, '222': 27417
	, '234': 169942
	, '236': 863436
	, '237': 812660
	, '240': 17708
	, '245': 15642
	, '246': 27415
	, '247': 295555
	, '249': 20063
	, '250': 156489
	, '255': 1639447
	, '256': 238132
	, '259': 1566261
	, '260': 35042
	, '263': 5633370
	, '265': 1982833
	, '269': 77100
	, '271': 78432
	, '275': 76247
	, '277': 57822
	, '282': 64298
	, '283': 17903
	, '284': 63725 // only one direction
	, '285': 67560
	, '291': 227583
	, '294': 238058
	, '296': 103166
	, '309': 53981
	, '310': 6168647
	, '316': 300962
	, '318': 305650
	, '322': 67289
	, '326': 1022001
	, '334': 172094
	, '337': 111543
	, '347': 147324
	, '349': 56436
	, '350': 165138
	, '353': 1566260
	, '363': 1231719
	, '369': 5804140
	, '371': 1231718
	, '372': 78436
	, '373': 78036 // only one direction
	, '380': 63852
	, '390': 228506
	, '395': 229592
	, '396': 85388
	, '398': 85934
	, '399': 85352
	// there seem to be *two* lines, but one is not mappen
	, '806': 3401822
	, '809': 3753168

	// http://www.openstreetmap.org/relation/174283
	, M11: 63605
	, M19: 358614
	, M21: 52952
	, M27: 19000
	, M29: 223760
	, M32: 812487
	, M37: 812427
	, M41: 27414
	, M44: 76982
	, M45: 86794
	, M46: 76983
	, M48: 17681
	, M49: 169972
	, M76: 76245
	, M77: 62927
	, M82: 63596
	, M85: 1067258

	// http://www.openstreetmap.org/relation/174254
	, TXL: 17680
	, X7:  78079
	, X9:  1662188
	, X10: 1881324
	, X11: 63607
	, X21: 88364
	, X33: 86805
	, X34: 102244
	, X49: 1898819
	, X54: 227648
	, X69: 80402
	, X76: 76246
	, X83: 17901

    , N1:  167370
    , N2:  17831
    , N3:  1467807
    , N5:  17734
    , N6:  3357470
    , N7:  78439
    , N8:  17735
    , N9:  1662155
    , N10: 1717335
    , N20: 1444944
    , N25: 1423564
    , N26: 2110402
    , N30: 2202087
    , N34: 1685684
    , N35: 1685758
    , N39: 1714833
    , N40: 1423340
    , N42: 6187430
    , N50: 91669
    , N56: 2341764
    , N58: 931833
    , N60: 1231717
    , N62: 35016
    , N65: 17822
    , N68: 2192822
    , N79: 76981
    , N81: 64004
    , N84: 63970
    , N88: 63968
    , N91: 39066
    , N94: 1115050

}
