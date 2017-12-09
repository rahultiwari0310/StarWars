import Utils from 'modules/Utils';

describe('App', () => {
    it('should be able to run tests', () => {

        expect( Utils.isUndefined( 'null' ) ).toEqual( true );
        expect( Utils.isUndefined( 'hello' ) ).toEqual( false );
        expect( Utils.isTrue( 'true' ) ).toEqual( true );
        expect( Utils.isTrue( 'hello' ) ).toEqual( false );

    });
});