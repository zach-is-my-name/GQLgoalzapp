* {
    font-family: bentonreg;
}

.currentsteps-label {
    margin-left: 256px;
}

ul.sortable-container {
    /*border: solid 1px black;*/
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 0 auto;
    min-height: 500px;
    /*justify-content: center;*/
    align-items: center;
    padding: 0;
}

.sortable-item-wrapper {
    /*border: solid 1px red;*/
    list-style: none;
    /*padding: 15px;*/
    display: flex;
    /* flex-wrap: wrap; */
    width: 453px;
    /*height: 75px;*/
    flex-wrap: wrap;
    justify-content: center;
    /*align-items: center;*/
    padding: 0;
}

.row-1 {
    display: flex;
    width: 100%;
    /* align-self: center; */
    justify-content: center;
    user-select: none;
    /*border: solid 1px orange;*/
    /*margin-bottom: 21px;*/
}

.row-2 {

}

li.minus-image {
    position: relative;
    /*top: -5px;*/
    margin-right: 29px;
    height: 30px;
    width: 30px;
}

li.current-step {
    height: 30px;
    cursor: default;
    user-select: none;
}

.plus-image {
    margin-left: 29px;
    position: relative;
    /*top: -4px;*/


}


.prompt {
    width: 105px;
    height: 45px;
    /*border: solid 1px black;*/
    /* order: 1; */
    /*margin-left: 46px;*/
}

.prompt p {
    margin: 0;
}