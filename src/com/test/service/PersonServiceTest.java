//package com.test.service;
//
//import static org.junit.Assert.*;
//
//import java.util.UUID;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import com.weili.config.RootConfig;
//import com.weili.model.PersonModel;
//import com.weili.service.PersonService;
//
//@RunWith(SpringRunner.class)
//@ContextConfiguration(classes=RootConfig.class)
//public class PersonServiceTest {
//
//	@Autowired
//	private PersonService personService;
//	
//	public void setPersonService(PersonService personService) {
//		this.personService = personService;
//	}
//
//	@Test
//	public void testGetPersonByWid() {
//		
//		PersonModel person = new PersonModel();
//		person.setWid(UUID.randomUUID().toString());
//		person.setName("TESTNAME");
//		person.setGender(1);
//		person.setIdCard("TESTCARD12345");
//		person.setPhone("12345677283");
//		person.setEmail("abce@1234.com");
//		
//		boolean isSucc = personService.addPerson(person);
//		assertEquals("PersonService addPerson error", isSucc, true);
//		
//		PersonModel newPer = personService.getPersonByWid(person.getWid());
//		assertEquals("PersonService getPersonByWid error", newPer.getName(), person.getName());
//		
//		isSucc = personService.deltePerson(person.getWid());
//		assertEquals("PersonService deltePerson error", isSucc, true);
//		
//		newPer = personService.getPersonByWid(person.getWid());
//		assertNull("PersonService getPersonByWid error", newPer);
//	}
//}
