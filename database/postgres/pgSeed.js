const newRelic = require('newrelic');
const faker = require('faker');
const db = require('./pgIndex.js');


const gettyImages = [
  "https://media.gettyimages.com/photos/boy-in-a-treehouse-looking-in-the-distance-with-binoculars-picture-id519079806?k=6&m=519079806&s=612x612&w=0&h=T2T1bqjrC5qWW8qG2DCO6dU-R6wHq2je4qaAcuIzHiE=",
  "https://media.gettyimages.com/photos/treehouse-picture-id980431586?k=6&m=980431586&s=612x612&w=0&h=DDWIINu8T0_am3qOxXSgHCT5HzGFPk6v9z16W4k5vCw=",
  "https://media.gettyimages.com/photos/diverse-group-of-children-smiling-and-waving-in-a-treehouse-picture-id518733276?k=6&m=518733276&s=612x612&w=0&h=f8PbLB1z27_UvUtudfE9NdQa9c34KnKsyViHRkQcXWM=",
  "https://media.gettyimages.com/photos/children-in-a-treehouse-with-boy-climbing-up-rope-ladder-picture-id517675056?k=6&m=517675056&s=612x612&w=0&h=7Mq7gtMOb_oNkk6p9Z789oDoS_KI5xSRUV97jWq36Mg=",
  "https://media.gettyimages.com/photos/father-and-son-building-a-tree-house-together-picture-id696935650?k=6&m=696935650&s=612x612&w=0&h=sDj-hYNSyJauy-9Oen7HVgpM2dyMGjnoHUccZkhUx-8=",
  "https://media.gettyimages.com/photos/lake-house-picture-id639451404?k=6&m=639451404&s=612x612&w=0&h=qZYZv8IiPay_loah6OpAaPBom02eoXCQvwpFniibGLQ=",
  "https://media.gettyimages.com/photos/remote-tree-house-in-forest-picture-id166345742?k=6&m=166345742&s=612x612&w=0&h=wIhnHDzukGt_df8fdYNwZp-Nr3sYnHmVlTCuP15_-Ng=",
  "https://media.gettyimages.com/photos/building-a-tree-house-together-picture-id951477750?k=6&m=951477750&s=612x612&w=0&h=jrPL1eDfcI2Nj_O_8DaUIgsvRGJCbKuaWOM02MKKi_8=",
  "https://media.gettyimages.com/photos/father-and-sons-building-tree-house-picture-id80992391?k=6&m=80992391&s=612x612&w=0&h=nwVAygqI4hFmM57NH8ahUuE5CZplVpqaUbaCwIl9OcY=",
  "https://media.gettyimages.com/photos/man-enjoying-on-swing-against-mountain-and-sky-picture-id960876498?k=6&m=960876498&s=612x612&w=0&h=2hiq6TBKkIRi_SY8gcCPTR45eZAxciaqkQx05eqNh58=",
  "https://media.gettyimages.com/photos/couple-on-walkway-of-remote-tree-house-picture-id166345738?k=6&m=166345738&s=612x612&w=0&h=6pRJR4hO0p27MRB2MUO-EJZeBjFk5j5_FF0NdNnp9WI=",
  "https://media.gettyimages.com/photos/boy-smiling-while-playing-with-friends-in-a-wooden-treehouse-picture-id516415358?k=6&m=516415358&s=612x612&w=0&h=6MMNiuS7c_ulgMEwVR-7i-mLsBijw2g1PQIa057PnL0=",
  "https://media.gettyimages.com/photos/tree-house-with-roof-terrace-picture-id111650761?k=6&m=111650761&s=612x612&w=0&h=nRTHf6f4EEmrzdh9fmady_UjcKfUSWRf_KPnLfmYJFY=",
  "https://media.gettyimages.com/photos/low-angle-view-of-tree-house-against-sky-during-sunset-picture-id580825907?k=6&m=580825907&s=612x612&w=0&h=YKvMPdfLxevkXmPEdEyi0KpKHhV_9s8ox95S0siMWvY=",
  "https://media.gettyimages.com/photos/row-of-children-sitting-on-a-rustic-wooden-treehouse-porch-picture-id517127926?k=6&m=517127926&s=612x612&w=0&h=GZrXQB6BjxPmERZyV-Yso3xMlxKb_X4PC2Br5Rke8r4=",
  "https://media.gettyimages.com/photos/boy-in-tree-house-picture-id89028134?k=6&m=89028134&s=612x612&w=0&h=XYSML1M3Nk04C7TrRLtYQqHsoGZ1gwhnEmzEHjxKQMk=",
  "https://media.gettyimages.com/photos/treehouse-in-backyard-with-swing-autumn-picture-id200182677-001?k=6&m=200182677-001&s=612x612&w=0&h=0aWRv9AOxnNJBTNsvASALKr4KcJODjXghATBBoaSrRI=",
  "https://media.gettyimages.com/photos/three-young-friends-playing-in-a-treehouse-in-summer-picture-id519078450?k=6&m=519078450&s=612x612&w=0&h=mrMu2mzEnZyKlDyhDlBvuoDRUQtqwli2KV6d7cbbq1A=",
  "https://media.gettyimages.com/photos/kids-in-treehouse-with-digital-tablets-picture-id550700785?k=6&m=550700785&s=612x612&w=0&h=QaC5XJTSUveT2XgNuGhbcL9rGd38haizFzjgpwIft4E=",
  "https://media.gettyimages.com/photos/mid-adult-man-building-wooden-tree-house-picture-id696935846?k=6&m=696935846&s=612x612&w=0&h=l-RrsqBiIfDdKZSxQQLceHwrrtdxknny4VcP5wogSm0=",
  "https://media.gettyimages.com/photos/boy-climbing-up-steps-on-tree-calimani-mountains-eastern-carpathians-picture-id639475046?k=6&m=639475046&s=612x612&w=0&h=krHjlfKAZL860HyF_A11L_tenLIgH9uM3NdnvT_sdpM=",
  "https://media.gettyimages.com/photos/father-and-two-sons-painting-tree-house-low-angle-view-picture-id1140098241?k=6&m=1140098241&s=612x612&w=0&h=krddiUcG7Juz1fRfq48DaMljhqLPsJQ1uVv7BaPSkCA=",
  "https://media.gettyimages.com/photos/childhood-friends-hammering-and-working-to-build-their-treehouse-picture-id518734384?k=6&m=518734384&s=612x612&w=0&h=w_61eSJrIDvXyRbvjE8W83EdNFjfPw1KguY7YMXaff8=",
  "https://media.gettyimages.com/photos/mid-adult-man-building-wooden-tree-house-picture-id696935746?k=6&m=696935746&s=612x612&w=0&h=VOpgbmFsy9Eyji0gLOVxGx_0MGaaSdhKlh_vr5ebGws=",
  "https://media.gettyimages.com/photos/having-a-snack-up-in-my-tree-house-picture-id950589800?k=6&m=950589800&s=612x612&w=0&h=_YOvnpN4uDI31JY7t0D_F7fz6l5_aAab5-ygisdf448=",
  "https://media.gettyimages.com/photos/father-and-son-hugging-in-tree-picture-id143071967?k=6&m=143071967&s=612x612&w=0&h=yjREtwpO8ZS0x0xj8E0qS37PVpCJQHzYqCm4qektfXk=",
  "https://media.gettyimages.com/photos/young-woman-relaxing-in-a-tree-house-at-sunset-picture-id471779188?k=6&m=471779188&s=612x612&w=0&h=IFN27iozoW6glFsHFSNkyMcjLRF_syzmEHsyGe-Lv2o=",
  "https://media.gettyimages.com/photos/smiling-boy-sitting-in-tree-house-at-forest-picture-id800406862?k=6&m=800406862&s=612x612&w=0&h=viX5w4P56IUQBylpNpRuxkEm9ciOlj8GIkM0Qd_QaE8=",
  "https://media.gettyimages.com/photos/tree-house-picture-id182035882?k=6&m=182035882&s=612x612&w=0&h=7_mKV6MWLTtQuFGmZqohBT70KFjZoMsOCcDmCq6jhwA=",
  "https://media.gettyimages.com/photos/father-and-son-building-a-tree-house-together-picture-id696935680?k=6&m=696935680&s=612x612&w=0&h=vMKCTIXLMddlQEyukH8ebc8JYGqD_sakFYAEezqTxBw=",
  "https://media.gettyimages.com/photos/children-playing-in-treehouse-picture-id87882011?k=6&m=87882011&s=612x612&w=0&h=2GF3rj3FR4PCMhskGkncm-X9BFEAiJprtnw3Sms3HUM=",
  "https://media.gettyimages.com/photos/young-woman-looking-at-the-jungle-from-her-bed-asia-picture-id910778750?k=6&m=910778750&s=612x612&w=0&h=qAY-sTPvpfo071OxPD1HRt1JC_KZX54C8VZJ10xIoXA=",
  "https://media.gettyimages.com/photos/illuminated-treehouse-in-backyard-at-night-picture-id182938932?k=6&m=182938932&s=612x612&w=0&h=9OkREtQno4iS1ZP4gdTpUgKWiqbZ8iIl77tYykI681E=",
  "https://media.gettyimages.com/photos/boy-in-a-treehouse-daydreaming-with-his-toy-wooden-plane-picture-id516414996?k=6&m=516414996&s=612x612&w=0&h=oYRXxPrqffoagwD6G4JTJJ7weDjBLg_TcQYkL7r6-r0=",
  "https://media.gettyimages.com/photos/tree-house-picture-id1152380939?k=6&m=1152380939&s=612x612&w=0&h=90oaI4vm_sHP6-rlNl0MoqPWRSiE0BZJSX4xIAR4qLY=",
  "https://media.gettyimages.com/photos/low-angle-view-of-tree-house-picture-id579009085?k=6&m=579009085&s=612x612&w=0&h=1IaL0mzFjQ_X6ymwQgB8eD19wCuyWNoPfHTi7tfL4mE=",
  "https://media.gettyimages.com/photos/friends-playing-on-tree-stumps-in-forest-picture-id800406824?k=6&m=800406824&s=612x612&w=0&h=wjRod-n0Hl6vq3vjkEjHf0aHRzSMQVZEF_vSE-cVIhs=",
  "https://media.gettyimages.com/photos/group-of-children-in-a-treehouse-blowing-bubbles-picture-id517668448?k=6&m=517668448&s=612x612&w=0&h=uCl7KCXNPxV4AgCOEEjTS32p0GYWR_PBtnlpGXUSncY=",
  "https://media.gettyimages.com/photos/the-ministers-treehouse-july-14-2012-picture-id170090960?k=6&m=170090960&s=612x612&w=0&h=fz5izusmWfgd3JBWtWh_1kli6QlP-I5O_lXZEVwkU1o=",
  "https://media.gettyimages.com/photos/germany-bavaria-view-of-tree-house-picture-id455447461?k=6&m=455447461&s=612x612&w=0&h=VZyb-AkNyEYrieb1RLunXQU9ieAteNxjdIkHxy-i3-Y=",
  "https://media.gettyimages.com/photos/young-couple-standing-in-tree-house-hugging-laughing-picture-id1140098268?k=6&m=1140098268&s=612x612&w=0&h=iqwrMmFGlCvIqbJ_fZrNalKjaZEixDRWzFTkFlleDUg=",
  "https://media.gettyimages.com/photos/childrens-playground-and-tree-house-in-residential-garden-quebec-picture-id926846262?k=6&m=926846262&s=612x612&w=0&h=UpuNcONMZnRLWqewhAdGwLhpCQ9PFXCTQaS5VAXuj2U=",
  "https://media.gettyimages.com/photos/mid-adult-man-building-wooden-tree-house-picture-id696935832?k=6&m=696935832&s=612x612&w=0&h=ADzezz8VtBJS7mp7qga2mi0b1CaDMrXUbrEDtpzECPY=",
  "https://media.gettyimages.com/photos/girl-mending-treehouse-picture-id87881713?k=6&m=87881713&s=612x612&w=0&h=X9_mFtHBW7rHGFhnqGHPym3w5D4cx18DMD_Qk3ykRrw=",
  "https://media.gettyimages.com/photos/girls-and-boys-talking-and-playing-in-a-wooden-treehouse-picture-id516414784?k=6&m=516414784&s=612x612&w=0&h=MEu9wsSCvwYPUzf1LWE21dfMH51exX4tE7CMpbY6C_M=",
  "https://media.gettyimages.com/photos/awesome-tree-house-up-high-in-single-tree-picture-id157678170?k=6&m=157678170&s=612x612&w=0&h=dHZNzb4PvD3csImPCQEafPKEaH6lEDyESTx_Vwrz7jM=",
  "https://media.gettyimages.com/photos/little-boy-building-a-tree-house-picture-id950447324?k=6&m=950447324&s=612x612&w=0&h=TwGliszpHsnSMZAoheXnOksx8b-rXu9OaG0z4MyGp18=",
  "https://media.gettyimages.com/photos/woman-on-tree-house-watching-sunset-picture-id471756552?k=6&m=471756552&s=612x612&w=0&h=q3HtV-V8D5JUZif1rHvyRzrKQPxm9I4rxG2XuBB7J_Q=",
  "https://media.gettyimages.com/photos/cheerful-woman-relaxing-on-patio-over-the-jungle-thailand-picture-id910778374?k=6&m=910778374&s=612x612&w=0&h=VEjQ93xM6qcjCbVrOQWfp3Aipyuf4EACGS9wj7gSoYo=",
  "https://media.gettyimages.com/photos/couple-on-tree-house-balcony-picture-id1046004976?k=6&m=1046004976&s=612x612&w=0&h=ZUpGroVanB21JM7-S9sEo_Mpr2yRaVvK3L5rRbPQnW0=",
  "https://media.gettyimages.com/photos/trees-in-forest-picture-id697618701?k=6&m=697618701&s=612x612&w=0&h=jjNvlKUVgpATdgkf5iblfGZZ78cJBFfZbbXUrPdusdM=",
  "https://media.gettyimages.com/photos/brothers-picture-id165952122?k=6&m=165952122&s=612x612&w=0&h=CvNYWmGdnpwM7Fh7_OwOEAGLuZcs4T_kqEj5psBa5mU=",
  "https://media.gettyimages.com/photos/father-and-son-building-a-tree-house-together-picture-id696935676?k=6&m=696935676&s=612x612&w=0&h=C_nHeZht2ZzPBDDlpSqYhUWeABCf2VvNdS9sCkRDw1s=",
  "https://media.gettyimages.com/photos/tree-house-in-the-woods-picture-id819382836?k=6&m=819382836&s=612x612&w=0&h=rqGyrXt3eeWNNw-AYPdj1g8ce5khU_lJJ1TUOmePs4Q=",
  "https://media.gettyimages.com/photos/building-a-tree-house-with-my-grandfather-picture-id950589524?k=6&m=950589524&s=612x612&w=0&h=Xt3X1WyMjP60f-ZLbeFXavmR5NbE0HRb6l8Dh8gWCEw=",
  "https://media.gettyimages.com/photos/father-and-son-hugging-in-tree-picture-id167920818?k=6&m=167920818&s=612x612&w=0&h=gAj2oQQcGDHY3wdZZNWTo2zudmjgmqDy4eA1n76Ylb0=",
  "https://media.gettyimages.com/photos/boy-using-binoculars-on-treehouse-picture-id492275681?k=6&m=492275681&s=612x612&w=0&h=_0xpRXmA2-XyFlL_tL8afzaUMFEyvCNiSlvzl29ttUw=",
  "https://media.gettyimages.com/photos/mature-woman-and-two-sons-toasting-marshmallows-on-campfire-at-night-picture-id702543639?k=6&m=702543639&s=612x612&w=0&h=MVakOsPBTfx1702LO9OjLABkxnACgtEok7ygr9PYDtE=",
  "https://media.gettyimages.com/photos/last-adjustments-on-my-tree-house-picture-id950589230?k=6&m=950589230&s=612x612&w=0&h=WTaUsmWe66PvdUmwL_FTcJzMARPROljZVpX6057cRsE=",
  "https://media.gettyimages.com/photos/children-in-a-treehouse-smiling-together-as-friends-picture-id513556170?k=6&m=513556170&s=612x612&w=0&h=CIDVp3jDpWzNF0MHdKC9tjtvNJ6tz2KxWkuSmcFJCHo=",
  "https://media.gettyimages.com/photos/the-dragonfly-design-by-rintala-eggertsson-architects-treehotel-picture-id929399640?k=6&m=929399640&s=612x612&w=0&h=o25zm0202ysQgF45Fw6uOy0YlLrPqs9r7t0k4DkhjPk=",
  "https://media.gettyimages.com/photos/tree-house-picture-id96960536?k=6&m=96960536&s=612x612&w=0&h=Es3Jo5-VrXa3GGwvsteUCJ0r8ujMG3CUtCv3XjCyDik=",
  "https://media.gettyimages.com/photos/wooden-tree-house-built-in-a-tree-picture-id601944078?k=6&m=601944078&s=612x612&w=0&h=_KRiM_1FmkyrbD4m504BqPmVCbTzG_3y-7Kt0adDyhc=",
  "https://media.gettyimages.com/photos/children-sitting-on-a-tractor-under-big-tree-with-treehouse-picture-id518028752?k=6&m=518028752&s=612x612&w=0&h=jErd-Sevh-7HtQlQQz64cSi1Wc-iyRw__ffSPcZN_rE=",
  "https://media.gettyimages.com/photos/large-dog-next-to-small-dog-in-cage-picture-id83356824?k=6&m=83356824&s=612x612&w=0&h=eGAoAOFKgyeg802bGvbG3NFUKnMwZKOepSJu_5U0hqE=",
  "https://media.gettyimages.com/photos/small-dog-with-large-championship-ribbon-picture-id83356895?k=6&m=83356895&s=612x612&w=0&h=YrHsNKuQmtxtgdosKcVJBSwTr65B6T9e8p5gQzzByw4=",
  "https://media.gettyimages.com/photos/fantasy-house-and-tree-picture-id89043006?k=6&m=89043006&s=612x612&w=0&h=NGEHH9Jz_bweCf6_cYOcFP-mi036cc5akailOEyMM6s=",
  "https://media.gettyimages.com/photos/tree-house-hawaii-picture-id78394045?k=6&m=78394045&s=612x612&w=0&h=8_9832JN6lg-VSTpWyySHQBNHmIAlR3No1ov8XUiCwM=",
  "https://media.gettyimages.com/photos/the-treehouse-restaurant-reputed-to-be-one-of-the-largest-treehouses-picture-id90758580?k=6&m=90758580&s=612x612&w=0&h=U5gbe3lKd2MUpmhC-tWmH1KQVAa6Q_XWrg-CqfNV0_M=",
  "https://media.gettyimages.com/photos/grosses-baumhaus-mit-gartenbank-in-verschneiter-gartenlandschaft-picture-id1149372310?k=6&m=1149372310&s=612x612&w=0&h=zKb1rMj9NlzP29fZnFlFbEcDOzhIwO4ojvp56mbQFHY=",
  "https://media.gettyimages.com/photos/wooden-tree-house-built-in-a-tree-picture-id601943858?k=6&m=601943858&s=612x612&w=0&h=jjEWMcl5vTy53dnbWjX37nQi0VWjMmWYIWweU3Vmq6c=",
  "https://media.gettyimages.com/photos/visitors-enjoy-refreshments-inside-one-of-the-worlds-largest-and-most-picture-id51941284?k=6&m=51941284&s=612x612&w=0&h=4wCVe6Jv8goiWrvrKfQrxgZUL-QMEscSPPgSVgi7uyw=",
  "https://media.gettyimages.com/photos/an-inside-view-of-one-of-the-worlds-largest-and-most-exciting-ever-picture-id51941211?k=6&m=51941211&s=612x612&w=0&h=x-xio0mO3M9O9oEY2ePCucZGz5GXOV_jNAoD2UrlTSU=",
  "https://media.gettyimages.com/photos/visitors-enjoy-refreshments-by-a-log-fire-inside-one-of-the-worlds-picture-id51941298?k=6&m=51941298&s=612x612&w=0&h=qZTSc_GNS0d029kRKeH9O9d_BqPdmGrCyt7ByJOlvrs=",
  "https://media.gettyimages.com/photos/an-inside-view-of-one-of-the-worlds-largest-and-most-exciting-ever-picture-id51941240?k=6&m=51941240&s=612x612&w=0&h=m7yi7aOqU9vt9ciTBQMCOqsOdLUMmT4-9lLU9kESR2E=",
  "https://media.gettyimages.com/photos/zev-hoover-stood-on-the-ladder-to-his-treehouse-at-his-family-home-in-picture-id180149021?k=6&m=180149021&s=612x612&w=0&h=ks5krHMXxAyaTOAoQdB2h7YmqWFrGP16OlG7aHRVDy4=",
  "https://media.gettyimages.com/photos/standard-and-minature-doberman-pinschers-picture-id83356807?k=6&m=83356807&s=612x612&w=0&h=HAY9cRXksSXmZ9JuAA41BjU-9ELB8DgLS5HtpBnQyU4=",
  "https://media.gettyimages.com/photos/wooden-tree-house-built-in-a-tree-picture-id601943966?k=6&m=601943966&s=612x612&w=0&h=nMXeDgAJV0ZFEJ2XC5clw9V65Se41W0DDTdEfc_XDGc=",
  "https://media.gettyimages.com/photos/view-of-at-the-somerset-house-ice-rink-with-its-huge-christmas-tree-picture-id587482110?k=6&m=587482110&s=612x612&w=0&h=cOO6mW9XYwxZmRZMFYa11QCcnXpfn_QLyZjbWkkMqZ8=",
  "https://media.gettyimages.com/photos/view-of-at-the-somerset-house-ice-rink-with-its-huge-christmas-tree-picture-id587481930?k=6&m=587481930&s=612x612&w=0&h=uOSdjbT9tkrOgCem9fkc2e0R1-9u828phoiTrRLbOF8=",
  "https://media.gettyimages.com/photos/downed-tree-that-spared-a-house-in-nw-washington-dc-july-2-2012-of-picture-id589146830?k=6&m=589146830&s=612x612&w=0&h=kKJ2duQf0_w2wgcaaplcZ2XRfrLP5nqex02paXN41J8=",
  "https://media.gettyimages.com/photos/school-kids-had-another-day-off-the-day-after-hurricane-sandy-hit-the-picture-id155082260?k=6&m=155082260&s=612x612&w=0&h=Z2toerxwlos_TQu2CWPfUBJWV58xJHB9JLENbiMOhSc=",
  "https://media.gettyimages.com/photos/view-of-at-the-somerset-house-ice-rink-with-its-huge-tiffany-tree-picture-id587483208?k=6&m=587483208&s=612x612&w=0&h=Xh1lj08ojrqlvN4e_0YbL65YsGe6Z2571goGbDGRl5U=",
  "https://media.gettyimages.com/photos/chris-ware-color-illustration-of-man-wondering-how-big-the-tree-he-is-picture-id166174787?k=6&m=166174787&s=612x612&w=0&h=sRiLNX35EuCIxw8S9NjGknaIM04xVs2l_oi5l-Bx0eE=",
  "https://media.gettyimages.com/photos/stereographic-card-marked-calaveras-big-trees-titled-one-of-the-and-picture-id509383340?k=6&m=509383340&s=612x612&w=0&h=NR_W_faVTmbQkZLoumBxs7TRETjQ9yz-fXFq0rD9l2E=",
  "https://media.gettyimages.com/photos/view-of-at-the-somerset-house-ice-rink-with-its-huge-tiffany-tree-picture-id587483462?k=6&m=587483462&s=612x612&w=0&h=Tziah7T8lIEZI7N9EMV1OZipdR8TBeuURlrVrO4byKQ=",
  "https://media.gettyimages.com/photos/ahmed-hobeishi-poses-for-a-picture-outside-his-tree-house-built-on-a-picture-id1045557458?k=6&m=1045557458&s=612x612&w=0&h=Sv1aNKagqkQhfJ3DP1Q7Pn0nKT1IwSsUetL1UZvU_q4=",
  "https://media.gettyimages.com/photos/ahmed-hobeishi-poses-for-a-picture-from-inside-his-tree-house-built-picture-id1045557552?k=6&m=1045557552&s=612x612&w=0&h=BBCqZ5-g3SL6oioE9elj48fvqfCGUckhOL0x3uLz2kc=",
  "https://media.gettyimages.com/photos/whats-left-of-the-bedroom-where-a-young-girl-was-sleeping-when-a-picture-id56091516?k=6&m=56091516&s=612x612&w=0&h=dMDrZ29NhCMOI1-DxuVRQ6kO0y6sRxol3-uY45fT6-Y=",
  "https://media.gettyimages.com/photos/aditya-mahato-3yrs-injured-as-a-huge-tree-with-rock-collapsed-inside-picture-id694190590?k=6&m=694190590&s=612x612&w=0&h=3LgIYvOTni1i5wBnMh0VxEIhOY6o5VkaWBKuWBqdxvI=",
  "https://media.gettyimages.com/photos/indrajit-7months-old-baby-injured-as-a-huge-tree-with-rock-collapsed-picture-id694190564?k=6&m=694190564&s=612x612&w=0&h=qUkBXN2BQIczgHntOotzuelIdmQB9N9AOvm7wdWRrsY=",
  "https://media.gettyimages.com/photos/huge-tree-with-rock-collapsed-inside-a-house-at-daurang-nagar-chawl-picture-id694190614?k=6&m=694190614&s=612x612&w=0&h=RdQpUOkmWUBln-3xxT4141hXUkw8kzrNMsKixyiTDBc=",
  "https://media.gettyimages.com/photos/ashok-mahato-30yrs-with-his-wife-seema-mahato-25yrs-injured-as-a-huge-picture-id694190512?k=6&m=694190512&s=612x612&w=0&h=ZQAPnNbrDoMnFk6XHQknzAQ4ANuNDpq9_js8E6wbZVM=",
  "https://media.gettyimages.com/photos/ashok-mahato-30yrs-injured-as-a-huge-tree-with-rock-collapsed-inside-picture-id694190540?k=6&m=694190540&s=612x612&w=0&h=aU0_kaF5AbkQ2Ffn_PUDl1Ue8oBeufA_H4Lzb0JlpgE=",
  "https://media.gettyimages.com/photos/adrian-nicolella-tries-to-clean-up-downed-branches-off-of-portland-picture-id517114168?k=6&m=517114168&s=612x612&w=0&h=XihDwBaLtyv2kEOEzYkj6dYIj2L7vauSTeUmrx_eitc=",
  "https://media.gettyimages.com/photos/adrian-nicolella-tries-to-clean-up-downed-branches-off-of-portland-picture-id517114050?k=6&m=517114050&s=612x612&w=0&h=Ft0Te4Eiq0vD22koAmyB_95coqC8l2ox9xWBcaFUlrA=",
  "https://media.gettyimages.com/photos/school-kids-left-to-right-tal-sternberg-luke-beckett-and-daniel-had-picture-id155082278?k=6&m=155082278&s=612x612&w=0&h=VmFHHfsKripQai4_BxB8xBAoIl_eWy7xKzp5nFBG0Fk=",
  "https://media.gettyimages.com/photos/tienty-tangara-stands-on-a-tree-where-his-house-were-destroyed-to-picture-id527990156?k=6&m=527990156&s=612x612&w=0&h=-KPlVD_2E0yr_1RlsQ_1wxXFYYTAR3k6Gyp03yXtlQ0=",
  "https://media.gettyimages.com/photos/an-atmospheric-night-time-view-of-tthe-somerset-house-ice-rink-with-picture-id587485316?k=6&m=587485316&s=612x612&w=0&h=FfXYf0I4CcBnmf2tapDDrGFPY3eKlXA5ad8LhhPBNUs=",
  "https://media.gettyimages.com/photos/the-smiths-have-placed-rocks-with-family-members-names-written-on-a-picture-id487896177?k=6&m=487896177&s=612x612&w=0&h=GLPL4YTmJprQj6rAVjk7zzeUmlQtEkCj-8MWVRIovaw=",
  "https://media.gettyimages.com/photos/workers-plant-a-archontophoenix-cunninghamiana-inside-the-temperate-picture-id917963318?k=6&m=917963318&s=612x612&w=0&h=migLyz2IFEma0-LDJdxOuDexSath89BM-BYGeH3wzAY=",
  "https://media.gettyimages.com/photos/pics-of-mihan-qazi35-yrsjr-preschooler-putting-the-finishing-touches-picture-id165454936?k=6&m=165454936&s=612x612&w=0&h=30i5Ws4gSm9YssaIem5vwlAzlSo4WLgqPiJqAZBFevM=",
  "https://media.gettyimages.com/photos/deputy-prime-minister-john-prescott-today-pledged-to-recycle-bottles-picture-id830118122?k=6&m=830118122&s=612x612&w=0&h=RoYM7uq-Hw8uB6bJ0IEIXNXvQ1xoglrwWZP5hS6WUqg=",
  "https://media.gettyimages.com/photos/house-with-blossoming-tree-picture-id76749917?k=6&m=76749917&s=612x612&w=0&h=_s728cIDiVF_ftogk1_5bCAH3CjSrZdgUy_amSanEBU=",
  "https://media.gettyimages.com/photos/blossoming-tree-and-house-picture-id76749916?k=6&m=76749916&s=612x612&w=0&h=t9NrhpGwEkJGoDX_3WAovdca7BMBLMVOV5Y6V9ssg50=",
  "https://media.gettyimages.com/photos/blossoming-tree-and-house-picture-id76749918?k=6&m=76749918&s=612x612&w=0&h=M5RY5fkATi0byDohG71ovV0yQrTtSoOYXxYp9rPlYCs=",
  "https://media.gettyimages.com/photos/governor-house-big-tree-picture-id1163507185?k=6&m=1163507185&s=612x612&w=0&h=xtwzyM8ityg8XQj5pvNX-atXCL3K78MURBgecqs9pns=",
  "https://media.gettyimages.com/photos/grosses-baumhaus-mit-gartenbank-in-verschneiter-gartenlandschaft-picture-id1149372309?k=6&m=1149372309&s=612x612&w=0&h=LIzb_zJnaMz8VDI-oq6cqWfXwthCBWTgHjy5BvIyGbY=",
  "https://media.gettyimages.com/photos/if-you-go-down-in-the-woods-today-especially-near-the-northside-you-picture-id1079037188?k=6&m=1079037188&s=612x612&w=0&h=I60Nh33wjAdO61R6oLi4kXoJVaSgEo1SX5Vk-fPhADQ=",
  "https://media.gettyimages.com/photos/man-jogs-by-a-house-that-just-missed-getting-severely-damaged-after-a-picture-id588165772?k=6&m=588165772&s=612x612&w=0&h=YoBXIJWEWzySF5ZEdLCrPYsf6TIbAsJVw40Hha3MWlk=",
  "https://media.gettyimages.com/photos/double-house-with-an-enormous-tree-picture-id1051909982?k=6&m=1051909982&s=612x612&w=0&h=m8zhb54Sp9QU5Yk0YD98gCsd1MC4FdFVp5P_GiSEIhI=",
  "https://media.gettyimages.com/photos/big-tree-on-the-overflowsystem-on-the-dam-near-au-an-der-donau-after-picture-id170327139?k=6&m=170327139&s=612x612&w=0&h=s6Cjn-X78-HCOVB8YGLqKh_IOrm0a3Sh5Er7NjZuKDs=",
  "https://media.gettyimages.com/photos/sunset-view-of-at-the-somerset-house-ice-rink-with-its-huge-tiffany-picture-id587483132?k=6&m=587483132&s=612x612&w=0&h=5Fyvw0vYV3-Vh9HOLtcX1uQ_MP5umYU8BTSIWW35afQ=",
  "https://media.gettyimages.com/photos/workers-plant-a-archontophoenix-cunninghamiana-inside-the-temperate-picture-id917963420?k=6&m=917963420&s=612x612&w=0&h=MGdH1UU7Tok3vtG5VHYHan8vr8kx_Ivud4b_D2e4trY=",
  "https://media.gettyimages.com/photos/fireman-standing-on-the-tree-peers-into-the-bedroom-where-a-young-picture-id56091515?k=6&m=56091515&s=612x612&w=0&h=jduOtw1qspIH9c5WXV_TSVCV1mxuk4wcs1V_uBCpzjY=",
  "https://media.gettyimages.com/photos/tienty-tangara-sits-on-a-tree-where-his-house-were-destroyed-to-make-picture-id527989248?k=6&m=527989248&s=612x612&w=0&h=1KS3iYcNjzzk5CYYZa0woeChu7IqwyzTHK8VdiDYBPM=",
  "https://media.gettyimages.com/photos/july-25-1932-bonus-army-riots-in-washington-photo-shows-david-budd-picture-id515567638?k=6&m=515567638&s=612x612&w=0&h=7jxosD1sQgHyeinO3KqvAeF-XatrqSVwr3xNsrTNvxQ=",
  "https://media.gettyimages.com/photos/the-huddled-rooftops-the-sprawling-streets-green-trees-and-flats-picture-id909056132?k=6&m=909056132&s=612x612&w=0&h=E4vbJdQ-GF93s3MMaSMun1HyRzSxWirxLZ7vnrOkHBI=",
  "https://media.gettyimages.com/photos/mark-wall-left-with-blue-river-forestry-tree-care-company-picks-up-picture-id517316952?k=6&m=517316952&s=612x612&w=0&h=1rmrukl1A7bhrPhaSeWdTzKjrEi9qHFxU1Ip02p0vow=",
  "https://media.gettyimages.com/photos/an-ancient-forest-rest-house-called-jogi-mahal-that-is-sheltered-by-a-picture-id496913483?k=6&m=496913483&s=612x612&w=0&h=-cAkTzJWjBE8-slXHcy-SnULyGUdGKep1kKkpsjRQrM="
];

const getFakerImageURLs = (num) => {
  let images = [];
  for (let i = 0; i < num; i++) {
    let randomIndex = Math.floor(Math.random() * gettyImages.length);
    let imageUrl = gettyImages[randomIndex];
    // console.log('imageUrl: ', imageUrl);
    images.push(imageUrl);
  }
  return images;
};

const getFakerParagraph = () => {
  return faker.lorem.paragraph();
};

const makeFakeData = (numOfDataPoints) => {
  let result = [];
  for (let i = 0; i < numOfDataPoints; i++) {
    let dataPoint = { preview_data: {} };
    dataPoint.preview_data["images"] = getFakerImageURLs(8);
    dataPoint.preview_data["app_description"] = getFakerParagraph();
    dataPoint.preview_data["additional_text"] = getFakerParagraph();
    // console.log('dataPoint: ', dataPoint);
    result.push(dataPoint);
  }
  // console.log('result from makeFakeData: ', result);
  return result;
};

const insertBulk = (dataArray) => {
  return db.addBulkApps(dataArray);
};

let chunkSize = 10;

const seedPostgresDb = (dataSize) => {
  let startTime = new Date().valueOf();
  let inserted = 0;
  return new Promise((resolve, reject) => {
    const doNext = () => {
      if (inserted >= dataSize) {
        resolve();
        return;
      } else {
        let dataChunk = makeFakeData(chunkSize);
        insertBulk(dataChunk)
          .then(() => {
            inserted += dataChunk.length;
            doNext();
          })
          .catch((err) => {
            console.log('error with insertBulk: ', err);
            resolve(err);
          });
      }
    }
    doNext();
  })
  .then(() => {
    let endTime = new Date().valueOf();
    let totalTime = ((endTime - startTime) / 1000);
    console.log(`Done seeding db of ${dataSize} records with chunks of ${chunkSize}. Finished in ${totalTime} seconds, with recs-per-sec of ${Math.round(dataSize/totalTime)}`);
  })
  .catch((err) => {
    console.log('there was an error seeding postgres: ', err);
  });
};

const seed = () => {
  seedPostgresDb(100);
};
seed();


