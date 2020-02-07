/* ------------------ studentViewAcrossPages */

function studentView() {
    const checkIfTeacher = async selector => {
      while (document.querySelector(selector) === null) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
      return document.querySelector(selector);
    };
    checkIfTeacher('.ic-app-nav-toggle-and-crumbs.no-print')
      .then((element) => {
        
        console.info(`%c add student view`, 'color:#f7f300');
          let isTeacher, isCourse, courseId, templateButton, studentViewVisible, studentViewURL, getPath;
          let visibleMenu = document.querySelector('.ic-app-course-menu.list-view nav #section-tabs li.section a[title="Settings"]');
          // Determine if the user is actually a teacher
          if (ENV['current_user_roles'].includes('teacher') && visibleMenu !== null) {
              isTeacher = true;
          } else {
              isTeacher = false;
          }
          console.log(isTeacher);
          // Get the current Course ID and path based on the url of the course
          isCourse = window.location.href.indexOf("/courses/") > -1;
          getPath = window.location.pathname;
          
          // Determine if the template button is currently visible
          templateButton = document.querySelector('.btn.button-sidebar-wide.element_toggler.choose_home_page_link');
          if(templateButton !== null){console.log(templateButton)}
          // Determine if the user is currently in student view
          studentViewVisible = document.querySelector('.ic-alert-masquerade-student-view');
      
          // Validate rendering the universal button based on the variables
          console.log(isTeacher,isCourse,studentViewVisible);
          if(isTeacher && isCourse && studentViewVisible === null) { // If the user is truly a teacher for this course/student view is not already enabled, render the button
              courseId = getPath.split('courses/').pop().split('/')[0];
              studentViewURL = `/courses/${courseId}/student_view`;
              document.querySelector('.ic-app-nav-toggle-and-crumbs.no-print').innerHTML +=`<a class="btn button-sidebar-wide quick-access" href="${studentViewURL}" rel="nofollow" data-method="post"><i class="icon-student-view" role="presentation"></i> Launch Student View</a>`;
          } else { // If the user is not a teacher or student view is already enabled
            if(document.querySelector('.ic-app-nav-toggle-and-crumbs.no-print') !== null && document.querySelector('.btn.button-sidebar-wide.quick-access') !== null){document.querySelector('.ic-app-nav-toggle-and-crumbs.no-print').removeChild('.btn.button-sidebar-wide.quick-access');}
          }
      });
}

/* ------------------ RUN ON PAGE LOAD */