package com.SocialMedial.Service;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SocialMedial.Entity.User;
import com.SocialMedial.Repository.UserRepository;


@Service
public class UserServiceImpl implements ExecutorService{
	 @Autowired
	    private UserRepository userRepository;

	    public User saveUser(User user) {
	        return userRepository.save(user);
	    }

	    public List<User> getAllUsers() {
	        return userRepository.findAll();
	    }

		@Override
		public void execute(Runnable command) {
			// TODO Auto-generated method stub
			
		}

		@Override
		public void shutdown() {
			// TODO Auto-generated method stub
			
		}

		@Override
		public List<Runnable> shutdownNow() {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public boolean isShutdown() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean isTerminated() {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException {
			// TODO Auto-generated method stub
			return false;
		}

		@Override
		public <T> Future<T> submit(Callable<T> task) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <T> Future<T> submit(Runnable task, T result) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public Future<?> submit(Runnable task) {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks) throws InterruptedException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit)
				throws InterruptedException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <T> T invokeAny(Collection<? extends Callable<T>> tasks)
				throws InterruptedException, ExecutionException {
			// TODO Auto-generated method stub
			return null;
		}

		@Override
		public <T> T invokeAny(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit)
				throws InterruptedException, ExecutionException, TimeoutException {
			// TODO Auto-generated method stub
			return null;
		}
}
