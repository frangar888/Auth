/**
 * @properties={typeid:24,uuid:"09991DC3-3366-4219-88F6-8F506E8FEFE6"}
 */
function login(user,password){

/*	if(validarUser(lnk_user, lnk_pass) == 1){
		//lanzarVentanaEmergente(0,'El nombre de usuario no es correcto','Info',null,null,null)
		return false
	}
	if(validarUser(lnk_user, lnk_pass) == 2){
		//lanzarVentanaEmergente(0,'La contraseña no es correcta','Info',null,null,null)
		return false
	}
	if(validarUser(lnk_user, lnk_pass) == 0){
		   var ok = security.login(lnk_user,lnk_user,null) // Assume a group for each department
	       // application.output('User ' + user + ' authenticated: ' + ok, LOGGINGLEVEL.DEBUG);
	        return ok;
	}
    application.sleep(3000);
    return false;*/
	
    if (!(user && password)) {
        application.output('Unexpected credentials received', LOGGINGLEVEL.DEBUG);
        return false;
    }
    var authenticated = validarUser(user, password) //either query database or use LDAP
   
	if(authenticated == 1){
        application.output('Unexpected credentials received', LOGGINGLEVEL.DEBUG);
        return false;
    }
    
    if(authenticated == 2){
        application.output('Unexpected credentials received', LOGGINGLEVEL.DEBUG);
        return false;
    }
    
    if (authenticated == 0) {
    	//security.createGroup('Admin')
    	//security.addUserToGroup(user,'Admin')
		var ok = security.login(user, getUserId(user),['Administrators']) // Assume a group for each department
        application.output('User ' + user + ' authenticated: ' + ok, LOGGINGLEVEL.DEBUG);
        return ok;
    }
    application.output('User ' + user + ' could not be authenticated', LOGGINGLEVEL.DEBUG);
    // Sleep for 3 seconds to discourage brute force attacks
    application.sleep(3000);
    return false;
}



/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"A894E558-FBD9-423C-828E-BF10A0FFBB96"}
 */
function validarUser(lnk_user, lnk_pass){
	/** @type {JSFoundset<db:/peluqueria/adn_usuarios>}*/
	var fs_users = databaseManager.getFoundSet('peluqueria','adn_usuarios')
	fs_users.find()
	fs_users.user_nombre = lnk_user
	if(fs_users.search()== 0){
		return 1
	}else{
		fs_users.find()
		fs_users.user_nombre = lnk_user
		fs_users.user_pass = lnk_pass
		fs_users.user_estado = 0
		if(fs_users.search() == 0){
			return 2
		}
		else{
			//vg_user_id = fs_users.user_id
			return 0
		}
	}
	
}

/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * @param user
 *
 * @properties={typeid:24,uuid:"508E7761-1F6D-46FA-9EAB-45ED53297A81"}
 */
function getUserId(user){
	/** @type {JSFoundSet<db:/peluqueria/adn_usuarios>} */
	var fs_users = databaseManager.getFoundSet('peluqueria','adn_usuarios')
	fs_users.find()
	fs_users.user_nombre = user
	if(fs_users.search() != 0){
		return fs_users.user_id
	}
	return null
}